import * as faceapi from "face-api.js"
import { StateUpdater } from "preact/hooks"

export interface FeatureRatingsData {
  age: number
  gender: {
    gender: "male" | "female"
    probability: number
  }
  expressions: ReadonlyMap<string, number>
}

const tinyFaceOptions = new faceapi.TinyFaceDetectorOptions({
  inputSize: 512,
  scoreThreshold: 0.5
})

function isFaceDetectionModelLoaded(): boolean {
  return faceapi.nets.tinyFaceDetector.params !== undefined
}

let faceInitialized: boolean = false

export async function initialize(): Promise<void> {
  if (faceInitialized) {
    console.warn("models already loaded once, so not loading again")
    return
  }
  const netUri = "assets/models"
  await Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri(netUri),
    faceapi.nets.faceRecognitionNet.loadFromUri(netUri),
    faceapi.nets.ageGenderNet.loadFromUri(netUri),
    faceapi.nets.faceExpressionNet.loadFromUri(netUri)
  ])
  faceInitialized = true
}

let requestAnimationFrameId: number | null = null

type FeaturesUpdater = (ratings: FeatureRatingsData | null) => void

export function scheduleDetection(
  input: HTMLVideoElement,
  stateUpdater: FeaturesUpdater
): () => void {
  requestAnimationFrameId = requestAnimationFrame(() =>
    detect(input, stateUpdater)
  )
  return stopDetection
}

function rescheduleDetection(
  input: HTMLVideoElement,
  stateUpdater: FeaturesUpdater
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
  stateUpdater: FeaturesUpdater
): Promise<void> {
  if (!isFaceDetectionModelLoaded()) {
    console.debug("model not yet ready")
    rescheduleDetection(input, stateUpdater)
    return
  }
  const detection = await faceapi
    .detectSingleFace(input, tinyFaceOptions)
    .withAgeAndGender()
    .withFaceExpressions()
  if (detection !== undefined) {
    const ratings: FeatureRatingsData = {
      age: detection.age,
      gender: {
        gender: detection.gender,
        probability: detection.genderProbability
      },
      expressions: new Map<string, number>(
        Object.entries(detection.expressions)
      )
    }
    console.debug(ratings)
    stateUpdater(ratings)
  } else {
    stateUpdater(null)
  }
  rescheduleDetection(input, stateUpdater)
}
