import * as faceapi from "face-api.js"
import { AssertionError } from "assert"
import { assertIsNotArray, assertIsDefined } from "./assert"

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
  console.time("loadFaceModels")
  await Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri(netUri),
    faceapi.nets.faceRecognitionNet.loadFromUri(netUri),
    faceapi.nets.ageGenderNet.loadFromUri(netUri),
    faceapi.nets.faceExpressionNet.loadFromUri(netUri)
  ])
  console.timeEnd("loadFaceModels")
  faceInitialized = true
}

let timeoutId: ReturnType<typeof setTimeout> | null = null

type FeaturesUpdater = (ratings: FeatureRatingsData | null) => void

export function scheduleDetection(
  input: HTMLVideoElement,
  stateUpdater: FeaturesUpdater
): () => void {
  // make the first detection run right away
  const timeoutTime = timeoutId === null ? 0 : 200
  timeoutId = setTimeout(() => detect(input, stateUpdater), timeoutTime)
  return stopDetection
}

function rescheduleDetection(
  input: HTMLVideoElement,
  stateUpdater: FeaturesUpdater
): void {
  if (timeoutId !== null) {
    scheduleDetection(input, stateUpdater)
  }
}

function stopDetection(): void {
  if (timeoutId !== null) {
    clearTimeout(timeoutId)
    timeoutId = null
  }
}

async function detect(
  input: HTMLVideoElement,
  stateUpdater: FeaturesUpdater
): Promise<void> {
  console.time("totalDetect")
  try {
    assertIsDefined(
      faceapi.nets.tinyFaceDetector.params,
      "face detection model not yet loaded"
    )

    console.time("detectFace")
    const detectedFace = await faceapi.detectSingleFace(input, tinyFaceOptions)
    console.timeEnd("detectFace")
    assertIsDefined(detectedFace, "no face found in input")

    console.time("extractFace")
    const faceCanvases = await faceapi.extractFaces(input, [detectedFace])
    console.timeEnd("extractFace")
    const faceCanvas = faceCanvases.length > 0 ? faceCanvases[0] : undefined
    assertIsDefined(
      faceCanvas,
      "failed to extract detected face's canvas from input"
    )

    console.time("recognizeFeatures")
    const [ageGenderPrediction, expressionRecognitions] = await Promise.all([
      faceapi.predictAgeAndGender(faceCanvas),
      faceapi.recognizeFaceExpressions(faceCanvas)
    ])
    console.timeEnd("recognizeFeatures")
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
  } catch (e) {
    console.debug(e.message)
    stateUpdater(null)
  } finally {
    rescheduleDetection(input, stateUpdater)
    console.timeEnd("totalDetect")
  }
}
