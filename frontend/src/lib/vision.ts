import * as faceapi from "face-api.js"

const tinyFaceOptions = new faceapi.TinyFaceDetectorOptions({
  inputSize: 512,
  scoreThreshold: 0.5
})

function isFaceDetectionModelLoaded(): boolean {
  return faceapi.nets.tinyFaceDetector.params !== undefined
}

export async function initialize(): Promise<void> {
  await Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri("assets/models"),
    faceapi.nets.faceRecognitionNet.loadFromUri("assets/models"),
    faceapi.nets.ageGenderNet.loadFromUri("assets/models")
  ])
}

let requestAnimationFrameId: number | null = null

export function scheduleDetection(input: HTMLVideoElement): () => void {
  requestAnimationFrameId = requestAnimationFrame(() => detect(input))
  return stopDetection
}

function rescheduleDetection(input: HTMLVideoElement): void {
  if (requestAnimationFrameId !== null) {
    scheduleDetection(input)
  }
}

function stopDetection(): void {
  if (requestAnimationFrameId !== null) {
    cancelAnimationFrame(requestAnimationFrameId)
    requestAnimationFrameId = null
  }
}

async function detect(input: HTMLVideoElement): Promise<void> {
  if (!isFaceDetectionModelLoaded()) {
    console.debug("model not yet ready")
    rescheduleDetection(input)
    return
  }
  const detection = await faceapi
    .detectSingleFace(input, tinyFaceOptions)
    .withAgeAndGender()
  if (detection !== undefined) {
    console.debug({ age: detection.age, gender: detection.gender })
  }
  rescheduleDetection(input)
}
