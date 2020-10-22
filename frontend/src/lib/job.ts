import { TraitLabel } from "./face-reader-labels"

/** Info for a Job */
export type BasicJob = {
  /** Short name for job */
  readonly name: string
  /** Longer description for job */
  readonly description?: string
  /** Face reader trait used to evaluate job */
  readonly trait: TraitLabel
  /** In cents (e.g. $2.50 is 250) */
  readonly maxPay: number
  /** Map of minimum scores to their customer rating text */
  readonly possibleReviews: Map<number, string>
}

export type CompletedJob = BasicJob & {
  /**
   * highest momentary score attained while doing job
   * (will be between 0 and 1)
   */
  highScore: number
}

export function getReview(completedJob: CompletedJob): string {
  const { highScore, possibleReviews } = completedJob
  // sort values in from highest to lowest `[5, 3, 1]`
  const scores = [...possibleReviews.keys()].sort((a, b) => b - a)
  for (const score of scores) {
    // if high score is higher than a score,
    // its also higher than the ones later in the list
    // so just get the review and return
    if (highScore > score) {
      // this should never be "missing" but freakin' tsc
      return possibleReviews.get(score) ?? "ERROR_MISSING_REVIEW"
    }
  }
  // this also shouldn't be possible, unless the map is empty
  return "ERROR_MISSING_REVIEW"
}
