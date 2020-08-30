import * as FaceReader from "../lib/face-reader"
import * as TF from "@tensorflow/tfjs-core"
import { NetInput } from "face-api.js"
import { tensor3d, tensor4d } from "@tensorflow/tfjs-core"

const ctx: Worker = self as any

type IncomingMessage =
  | { kind: "load-model" }
  | {
      kind: "read-face"
      data: Uint8Array
    }

export type OutgoingMessage =
  | { kind: "model-loaded" }
  | {
      kind: "face-read"
      ratings: FaceReader.FeatureRatingsData | null
    }

const handleMessage = async (msg: IncomingMessage): Promise<void> => {
  switch (msg.kind) {
    case "load-model": {
      await FaceReader.initialize()
      ctx.postMessage({ kind: "model-loaded" })
      return
    }
    case "read-face": {
      const tensor = tensor3d(msg.data)
      const ratings = await FaceReader.detect(tensor)
      ctx.postMessage({ kind: "face-read", ratings })
      return
    }
  }
}

ctx.addEventListener("message", e => handleMessage(e.data))
