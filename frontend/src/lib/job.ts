import { TraitLabel } from "./face-reader-labels"

type BaseJob = {
  /** Short name for job */
  readonly name: string
  /** Longer description for job */
  readonly description?: string
  /** Face reader trait used to evaluate job */
  readonly trait: TraitLabel
  /** In cents (e.g. $2.50 is 250) */
  readonly maxTip: number
}

/** Info for a Job */
export type PotentialJob = BaseJob & {
  /** Map of minimum scores to their customer rating text */
  readonly possibleReviews: { minScore: number; review: string }[]
}

export type CompletedJob = BaseJob & {
  /**
   * highest momentary score attained while doing job
   * (will be between 0 and 1)
   */
  highScore: number
  review: string
  /** In cents (e.g. $2.50 is 250) */
  tip: number
}

export const completeJob = (
  job: PotentialJob,
  highScore: number
): CompletedJob => {
  const { name, description, trait, maxTip } = job
  const review = getReview(job, highScore),
    tip = getTip(job, highScore)
  return {
    name,
    description,
    trait,
    highScore,
    review,
    tip,
    maxTip
  }
}

export function getReview(job: PotentialJob, highScore: number): string {
  const { possibleReviews } = job
  // sort values in from highest to lowest `[5, 3, 1]`
  const reviewScores = [...possibleReviews].sort(
    (a, b) => b.minScore - a.minScore
  )
  for (const reviewScore of reviewScores) {
    // if high score is higher than a score,
    // its also higher than the ones later in the list
    // so just get the review and return
    if (highScore > reviewScore.minScore) {
      return reviewScore.review
    }
  }
  // this also shouldn't be possible, unless there are no reviews >:(
  return "ERROR_MISSING_REVIEW"
}

export function getTip(job: PotentialJob, highScore: number): number {
  return Math.trunc(highScore * job.maxTip)
}

export function getJobSubscriptionCost(job: BaseJob): number {
  return Math.ceil(job.maxTip / 2)
}

export function getJobGrandTotal(job: CompletedJob): number {
  return job.tip - getJobSubscriptionCost(job)
}

export function getStartingBalance(jobs: ReadonlyArray<CompletedJob>): number {
  return jobs.reduce((total, job) => getJobGrandTotal(job) + total, 0)
}

export function toDollars(cents: number): string {
  return `$${Number(Math.trunc(cents) / 100).toFixed(0)}`
}
