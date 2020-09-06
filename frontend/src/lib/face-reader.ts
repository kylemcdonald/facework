export interface FeatureRatingsData {
  expressions: ReadonlyMap<string, number>
}

let timeoutId: ReturnType<typeof setTimeout> | null = null

type FeaturesUpdater = (ratings: FeatureRatingsData | null) => void

export function scheduleDetection(
  input: HTMLVideoElement,
  sendFace: (input: HTMLVideoElement) => void
): () => void {
  // make the first detection run right away
  const timeoutTime = timeoutId === null ? 0 : 200
  timeoutId = setTimeout(() => sendFace(input), timeoutTime)
  return stopDetection
}

function stopDetection(): void {
  if (timeoutId !== null) {
    clearTimeout(timeoutId)
    timeoutId = null
  }
}
