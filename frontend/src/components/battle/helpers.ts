import { KeyFeatureScoring } from "."

function timeLeft(startTime: number, timeLimit: number): number {
  // convert to ms
  const timeLimitMs = timeLimit * 1000
  // format into whole seconds
  return Math.ceil((startTime + timeLimitMs - Date.now()) / 1000)
}

export function isPastTimeLimit(scoring: KeyFeatureScoring): boolean {
  const { startTime, timeLimit } = scoring
  if (startTime === undefined) {
    return false
  }
  return timeLeft(startTime, timeLimit) <= 0
}
