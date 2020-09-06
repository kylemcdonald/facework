import assert from "assert"
import * as tf from "@tensorflow/tfjs-core"
import "@tensorflow/tfjs-backend-wasm"
import { loadGraphModel, GraphModel } from "@tensorflow/tfjs-converter"
import * as blazeface from "@tensorflow-models/blazeface"
import {
  convertArrayBufferRGBAToUInt8RGB,
  preprocess
} from "../lib/arraybuffer-helpers"
import { FeatureRatingsData } from "../lib/face-reader"

// scale up the detection from blazeface to capture more context
const SCALE_FACTOR = 1.25

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      ratings: FeatureRatingsData | null
    }

const readFace = async (
  data: ReadFaceRequest,
  detector: blazeface.BlazeFaceModel,
  model: GraphModel
): Promise<ReadonlyArray<number> | null> => {
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
    // don't keep this `as`
    const [x1, y1] = detection.topLeft as [number, number]
    // don't keep this `as`
    const [x2, y2] = detection.bottomRight as [number, number]

    // scaled and equal aspect detection
    const size = Math.max(x2 - x1, y2 - y1) * SCALE_FACTOR
    const cx = (x1 + x2) / 2
    const cy = (y1 + y2) / 2
    // const x = cx - size / 2
    // const y = cy - size / 2

    const batch = preprocess(input, cx, cy, size, width, height)
    const modelStart = performance.now()
    const batchPrediction = model.predict(batch) as tf.Tensor2D
    // [0] because there is only one element in this batch
    const prediction = batchPrediction.arraySync()[0]
    const modelDuration = performance.now() - modelStart

    console.debug("model: " + modelDuration.toFixed() + "ms")
    console.debug("Tensors: " + tf.memory().numTensors)
    tf.engine().endScope()
    return prediction
  }
  tf.engine().endScope()
  return null
}

const prepare = async (): Promise<void> => {
  const loadStart = performance.now()
  await tf.setBackend("wasm")
  const detector = await blazeface.load()
  const model = await loadGraphModel(
    "assets/models/mobilenetv2-ferplus-0.830/model.json"
  )
  const loadDuration = performance.now() - loadStart
  console.debug("model load: " + loadDuration.toFixed() + "ms")
  ctx.addEventListener("message", e => {
    if (e.data.kind) {
      const ratings = readFace(e.data, detector, model)
      ctx.postMessage({ kind: "face-read", ratings })
    }
  })
}

const handleFirstMessage = async (msg: WorkerRequest): Promise<void> => {
  assert(msg.kind === "load-model", "first message wasn't a 'load-model'")
  await prepare()
  ctx.postMessage({ kind: "model-loaded" })
  return
}

ctx.addEventListener("message", e => handleFirstMessage(e.data), { once: true })
