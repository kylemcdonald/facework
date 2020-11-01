import { useEffect } from "preact/hooks"
import FaceReaderWorker from "worker-loader!../workers/face-reader"
import { WorkerResponse } from "../workers/face-reader"
import { assertIsDefined } from "./assert"

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
let currentEventListener = (m: MessageEvent): void =>
  console.debug("placeholer event listener called")

export function useFaceReader(
  faceReadCallback: (ratings: FeatureRatingsData | null) => void
): void {
  useEffect(() => {
    const worker = getWorker()
    worker.removeEventListener("message", currentEventListener)
    currentEventListener = (m): void => {
      const msg: WorkerResponse = m.data
      if (msg.kind === "face-read") {
        faceReadCallback(msg.ratings)
      }
    }
    worker.addEventListener("message", currentEventListener)
    initWorker()
  }, [])
}
