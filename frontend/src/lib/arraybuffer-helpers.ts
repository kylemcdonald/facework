import { tf } from "face-api.js"

const IMG_SIZE: [number, number] = [96, 96]
const SUB_FACTOR = 127.5
const DIV_FACTOR = 127.5

export function convertArrayBufferRGBAToUInt8RGB(
  buffer: ArrayBufferLike
): Uint8Array {
  // create view of ArrayBuffer
  const x = new Uint8Array(buffer)
  const n = x.length
  let i = 0
  let j = 0
  // loop through all pixels and shift them over to remove alpha
  while (i < n) {
    x[j] = x[i]
    i++
    j++
    x[j] = x[i]
    i++
    j++
    x[j] = x[i]
    i++
    j++
    i++
  }
  // return a subset of the original
  return x.slice(0, j)
}

export function preprocess(
  img: tf.Tensor3D,
  cx: number,
  cy: number,
  size: number,
  width: number,
  height: number
) {
  return tf.tidy(() => {
    const top = cy - size / 2
    const left = cx - size / 2
    const boxes = [
      [top / height, left / width, (top + size) / height, (left + size) / width]
    ]
    const boxIndices = [0]
    return tf.image
      .cropAndResize(img.toFloat().expandDims(), boxes, boxIndices, IMG_SIZE)
      .sub(SUB_FACTOR)
      .div(DIV_FACTOR)
  })
}
