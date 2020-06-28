import * as faceapi from "face-api.js"
import { StateUpdater } from "preact/hooks"

export interface FeatureRatingsData {
  age: number
  gender: "male" | "female"
}

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

export function scheduleDetection(
  input: HTMLVideoElement,
  stateUpdater: StateUpdater<FeatureRatingsData | null>
): () => void {
  requestAnimationFrameId = requestAnimationFrame(() =>
    detect(input, stateUpdater)
  )
  return stopDetection
}

function rescheduleDetection(
  input: HTMLVideoElement,
  stateUpdater: StateUpdater<FeatureRatingsData | null>
): void {
  if (requestAnimationFrameId !== null) {
    scheduleDetection(input, stateUpdater)
  }
}

function stopDetection(): void {
  if (requestAnimationFrameId !== null) {
    cancelAnimationFrame(requestAnimationFrameId)
    requestAnimationFrameId = null
  }
}

async function detect(
  input: HTMLVideoElement,
  stateUpdater: StateUpdater<FeatureRatingsData | null>
): Promise<void> {
  if (!isFaceDetectionModelLoaded()) {
    console.debug("model not yet ready")
    rescheduleDetection(input, stateUpdater)
    return
  }
  const detection = await faceapi
    .detectSingleFace(input, tinyFaceOptions)
    .withAgeAndGender()
  if (detection !== undefined) {
    const ratings: FeatureRatingsData = {
      age: detection.age,
      gender: detection.gender
    }
    console.debug(ratings)
    stateUpdater(ratings)
  } else {
    stateUpdater(null)
  }
  rescheduleDetection(input, stateUpdater)
}
