import { useEffect } from "preact/hooks"
import FaceReaderWorker from "worker-loader!../workers/face-reader"
import { WorkerResponse } from "../workers/face-reader"
import { assertIsDefined } from "./assert"

export interface FeatureRatingsData {
  expressions: ReadonlyMap<string, number>
}

let worker: FaceReaderWorker
// create this once for use inside sendFace()
const fromPixels2DContext = document.createElement("canvas").getContext("2d")

export function createWorker(): void {
  worker = worker ?? new FaceReaderWorker()
}

export function initWorker(): void {
  worker.postMessage({ kind: "load-model" })
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

  worker.postMessage({ kind: "read-face", buffer, width, height }, [buffer])
}

export function useFaceReader(
  faceReadCallback: (ratings: FeatureRatingsData | null) => void
): void {
  useEffect(() => {
    createWorker()
    worker.addEventListener("message", m => {
      const msg: WorkerResponse = m.data
      if (msg.kind === "face-read") {
        faceReadCallback(msg.ratings)
      }
    })
    initWorker()
  }, [])
}
