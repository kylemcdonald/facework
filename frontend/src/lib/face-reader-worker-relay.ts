import { useEffect } from "preact/hooks"
import FaceReaderWorker from "worker-loader!../workers/face-reader-worker"
import { FeatureRatingsData } from "./face-reader"
import { OutgoingMessage } from "../workers/face-reader-worker"
import { createCanvasFromMedia, toNetInput, imageToSquare } from "face-api.js"
import { assertIsNotArray } from "./assert"
import { browser as tfBrowser, tensor3d } from "@tensorflow/tfjs-core"

let worker: FaceReaderWorker

export function createWorker(): void {
  worker = worker ?? new FaceReaderWorker()
}

export function initWorker(): void {
  worker.postMessage({ kind: "load-model" })
}

export const sendFace: (input: HTMLVideoElement) => void = async input => {
  const canvas = createCanvasFromMedia(input)
  const tensor = tfBrowser.fromPixels(
    imageToSquare(canvas, Math.min(canvas.width, canvas.height), false)
  )
  const bytes = await tensor.bytes()
  assertIsNotArray(bytes, "ohno")

  worker.postMessage(
    {
      kind: "read-face",
      data: bytes
    },
    [bytes]
  )
}

export function useFaceReader(
  faceReadCallback: (ratings: FeatureRatingsData | null) => void
): void {
  //use effect
  useEffect(() => {
    worker.addEventListener("message", m => {
      const msg: OutgoingMessage = m.data
      if (msg.kind === "face-read") {
        faceReadCallback(msg.ratings)
      }
    })
  }, [])
}
