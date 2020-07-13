import * as faceapi from "face-api.js"
import { AssertionError } from "assert"

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

let faceInitialized = false

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
  try {
    assertIsDefined(
      faceapi.nets.tinyFaceDetector.params,
      "face detection model not yet loaded"
    )

    const detectedFace = await faceapi.detectSingleFace(input, tinyFaceOptions)
    assertIsDefined(detectedFace, "no face found in input")

    const faceCanvases = await faceapi.extractFaces(input, [detectedFace])
    const faceCanvas = faceCanvases.length > 0 ? faceCanvases[0] : undefined
    assertIsDefined(
      faceCanvas,
      "failed to extract detected face's canvas from input"
    )

    const [ageGenderPrediction, expressionRecognitions] = await Promise.all([
      faceapi.predictAgeAndGender(faceCanvas),
      faceapi.recognizeFaceExpressions(faceCanvas)
    ])
    assertIsNotArray(ageGenderPrediction, "age gender prediction")
    assertIsNotArray(expressionRecognitions, "expression recognitions")

    const ratings: FeatureRatingsData = {
      age: ageGenderPrediction.age,
      gender: {
        gender: ageGenderPrediction.gender,
        probability: ageGenderPrediction.genderProbability
      },
      expressions: new Map<string, number>(
        Object.entries(expressionRecognitions)
      )
    }
    console.debug(ratings)
    stateUpdater(ratings)
    rescheduleDetection(input, stateUpdater)
  } catch (e) {
    console.debug(e.message)
    stateUpdater(null)
    rescheduleDetection(input, stateUpdater)
    return
  }
}

/** Asserts that something isn't an array */
function assertIsNotArray<T>(
  val: T | T[],
  name = "something"
): asserts val is T {
  if (Array.isArray(val)) {
    throw new AssertionError({
      message: `Expected ${name} to NOT be an array, but received ${val}`
    })
  }
}

/** Asserts that something is defined */
function assertIsDefined<T>(
  val: T,
  message?: string
): asserts val is NonNullable<T> {
  if (val === undefined || val === null) {
    throw new AssertionError({
      message:
        message || `Expected something to be defined, but received ${val}`
    })
  }
}
