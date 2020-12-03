import { useEffect } from "preact/hooks"
import FaceReaderWorker from "worker-loader!../workers/face-reader"
import { WorkerResponse, ReadFaceResponse } from "../workers/face-reader"
import { assertIsDefined } from "./assert"
import { Nullable } from "./type-helpers"

/** in milliseconds */
const MAX_SEND_FACE_RATE = 200

/** The last time a face was sent to the worker */
let lastSendFaceTime = Date.now()

export interface FeatureRatingsData {
  expressions: ReadonlyMap<string, number>
}

let faceReaderWorker: FaceReaderWorker | null = null
// create this once for use inside sendFace()
const fromPixels2DContext = document.createElement("canvas").getContext("2d")

export function createWorker(): void {
  faceReaderWorker = faceReaderWorker ?? new FaceReaderWorker()
}

function getWorker(): FaceReaderWorker {
  faceReaderWorker = faceReaderWorker ?? new FaceReaderWorker()
  return faceReaderWorker
}

export function initWorker(): void {
  getWorker().postMessage({ kind: "load-model" })
}

export const shouldSendFaceNow = (): number => {
  const now = Date.now()
  const timeSinceLastSendFace = now - lastSendFaceTime
  if (timeSinceLastSendFace < MAX_SEND_FACE_RATE) {
    console.debug(
      `Too soon to send another face frame (${timeSinceLastSendFace}ms)`
    )
    return MAX_SEND_FACE_RATE - timeSinceLastSendFace
  }
  lastSendFaceTime = now
  return 0
}

export const sendFace: (input: HTMLVideoElement) => void = async input => {
  assertIsDefined(fromPixels2DContext)
  const width = input.videoWidth,
    height = input.videoHeight
  fromPixels2DContext.canvas.width = width
  fromPixels2DContext.canvas.height = height
  fromPixels2DContext.drawImage(input, 0, 0, width, height)
  const buffer = fromPixels2DContext.getImageData(0, 0, width, height).data
    .buffer

  getWorker().postMessage({ kind: "read-face", buffer, width, height }, [
    buffer
  ])
}
/**
 * Last event listener attached to "message" event of FaceReaderWorker"
 *
 * We have to keep track of this ourselves so we can remove it and not pile up
 * event listeners throughout gameplay
 */
let currentEventListener: Nullable<(m: MessageEvent) => void> = null

/** Remove `currentEventListener`, if it exists */
const cleanupEventListener = () => {
  if (faceReaderWorker !== null && currentEventListener !== null) {
    faceReaderWorker.removeEventListener("message", currentEventListener)
    currentEventListener = null
  }
}

export function useFaceReader(
  faceReadCallback: (
    ratings: FeatureRatingsData | null,
    response: ReadFaceResponse
  ) => void
): void {
  useEffect(() => {
    const worker = getWorker()
    cleanupEventListener()
    currentEventListener = (m): void => {
      const msg: WorkerResponse = m.data
      if (msg.kind === "face-read") {
        faceReadCallback(msg.ratings, msg.response)
      }
    }
    worker.addEventListener("message", currentEventListener)
    initWorker()
    return cleanupEventListener
  }, [])
}
