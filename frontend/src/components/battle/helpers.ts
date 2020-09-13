import { timeLeft } from "../../components/time-limit-display"
import { KeyFeatureScoring } from "."

export function isPastTimeLimit(scoring: KeyFeatureScoring): boolean {
  const { startTime, timeLimit } = scoring
  if (startTime === undefined) {
    return false
  }
  return timeLeft(startTime, timeLimit) <= 0
}
