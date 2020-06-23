import * as faceapi from "face-api.js"

export async function initialize(): Promise<void> {
  await Promise.all([
    faceapi.nets.ssdMobilenetv1.loadFromUri("assets/models"),
    faceapi.nets.faceRecognitionNet.loadFromUri("assets/models"),
    faceapi.nets.ageGenderNet.loadFromUri("assets/models")
  ])
}

export async function detect(input: HTMLVideoElement): Promise<void> {
  const detection = await faceapi.detectSingleFace(input).withAgeAndGender()
  if (detection !== undefined) {
    console.debug({ age: detection.age, gender: detection.gender })
  }
}
