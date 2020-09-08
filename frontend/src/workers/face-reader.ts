import * as tf from "@tensorflow/tfjs-core"
import { setWasmPath } from "@tensorflow/tfjs-backend-wasm"
import { loadGraphModel, GraphModel } from "@tensorflow/tfjs-converter"
import * as blazeface from "@tensorflow-models/blazeface"
import {
  convertArrayBufferRGBAToUInt8RGB,
  preprocess
} from "../lib/arraybuffer-helpers"
import { FeatureRatingsData } from "../lib/use-face-reader"
import expressionsLabels from "../lib/face-reader-labels"

// scale up the detection from blazeface to capture more context
const SCALE_FACTOR = 1.25

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ctx: Worker = self as any

/**
 * the fact that i've committed this file to the assets
 * repo is terrible but i've spent too much time fighting
 * webpack and typescript to let me import it directly so...
 * here we are.
 *
 * If our version of tfjs-backend-wasm ever changes, we'll
 * need to update this asset file
 */
setWasmPath("assets/wasm/tfjs-backend-wasm-1.7.4.wasm")

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

const extractRatings = (
  prediction: ReadonlyArray<number> | null
): FeatureRatingsData | null => {
  if (prediction === null) {
    return null
  }
  const labels = Array.from(expressionsLabels)
  const pairs = labels.map<[string, number]>((el, i) => [el, prediction[i]])
  const expressions = new Map<string, number>(pairs)
  return { expressions }
}

async function prepare(): Promise<void> {
  const loadStart = performance.now()
  await tf.setBackend("wasm")
  const detector = await blazeface.load()
  const model = await loadGraphModel(
    "assets/models/lfwa+-mobilenetv2_1.00_96-13-0.127/model.json"
  )
  const loadDuration = performance.now() - loadStart
  console.debug("model load: " + loadDuration.toFixed() + "ms")
  ctx.addEventListener("message", async e => {
    if (e.data.kind) {
      const prediction = await readFace(e.data, detector, model)
      const ratings = extractRatings(prediction)
      ctx.postMessage({ kind: "face-read", ratings })
    }
  })
  ctx.removeEventListener("message", handleFirstMessagesWrapper)
}

async function handleFirstMessages(msg: WorkerRequest): Promise<void> {
  if (msg.kind === "read-face") {
    console.warn("face read requested before model is loaded")
    // send a null answer back on the next tick
    setTimeout(() => ctx.postMessage({ kind: "face-read", ratings: null }), 0)
    return
  }
  if (msg.kind === "load-model") {
    await prepare()
    ctx.postMessage({ kind: "model-loaded" })
  }
}

function handleFirstMessagesWrapper(e: MessageEvent): void {
  handleFirstMessages(e.data)
}

ctx.addEventListener("message", handleFirstMessagesWrapper)
