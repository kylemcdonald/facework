import * as TF from "@tensorflow/tfjs-core"
import { tensor3d, tensor4d } from "@tensorflow/tfjs-core"
import {
  convertArrayBufferRGBAToUInt8RGB,
  preprocess
} from "../lib/arraybuffer-helpers"

// scale up the detection from blazeface to capture more context
const SCALE_FACTOR = 1.25

const ctx: Worker = self as any

type ReadFaceRequest = {
  kind: "read-face"
  buffer: ArrayBufferLike
  width: number
  height: number
}

type LoadModelRequest = {
  kind: "load-model"
}

type WorkerRequest = LoadModelRequest | ReadFaceRequest

export type WorkerResponse =
  | { kind: "model-loaded" }
  | {
      kind: "face-read"
      ratings: FaceReader.FeatureRatingsData | null
    }

const readFace = (data: ReadFaceRequest) => {
  const { buffer, width, height } = data

  // ArrayBuffer is untyped and in RGBA format, so we convert it to a
  // UInt8Array and drop the alpha channel to make it RGB (2ms)
  const UInt8RGB = convertArrayBufferRGBAToUInt8RGB(buffer)

  tf.engine().startScope()
  // load the RGB data into a tensor3d for tf.js (3ms)
  const input = tf.tensor3d(UInt8RGB, [height, width, 3])

  const detectorStart = performance.now()

  const detections = await detector.estimateFaces(input)

  const detectorDuration = performance.now() - detectorStart
  console.debug("detector: " + detectorDuration.toFixed() + "ms")

  if (detections.length > 0) {
    const detection = detections[0]

    // raw detection
    const [x1, y1] = detection.topLeft
    const [x2, y2] = detection.bottomRight

    // scaled and equal aspect detection
    const size = Math.max(x2 - x1, y2 - y1) * SCALE_FACTOR
    const cx = (x1 + x2) / 2
    const cy = (y1 + y2) / 2
    const x = cx - size / 2
    const y = cy - size / 2

    const batch = preprocess(input, cx, cy, size, width, height)
    const modelStart = performance.now()
    const prediction = model.predict(batch).arraySync()[0]
    const modelDuration = performance.now() - modelStart

    console.debug("model: " + modelDuration.toFixed() + "ms")
    console.debug("Tensors: " + tf.memory().numTensors)

    return prediction
  }
}

const handleMessage = async (msg: WorkerRequest): Promise<void> => {
  switch (msg.kind) {
    case "load-model": {
      await FaceReader.initialize()
      ctx.postMessage({ kind: "model-loaded" })
      return
    }
    case "read-face": {
      const ratings = readFace(msg)
      ctx.postMessage({ kind: "face-read", ratings })
      return
    }
  }
}

ctx.addEventListener("message", e => handleMessage(e.data))
