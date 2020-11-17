import { TraitLabel, getCaricaturePath } from "./face-reader-labels"

const HACK_MONEY_ACT = 3
const HACK_MONEY_AMOUNT = 10000

export type BaseJob = {
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

export function getJobCaricaturePath(job: BaseJob): string {
  return getCaricaturePath(job.trait)
}

export function getTip(job: PotentialJob, highScore: number): number {
  return Math.round(highScore * job.maxTip)
}

export function getJobSubscriptionCost(job: BaseJob): number {
  if (job.trait == "CEO") {
    // short-circuit the CEO subscription fee
    // to create a more comical effect
    return 250
  }
  return Math.ceil(job.maxTip / 2)
}

export function getJobGrandTotal(job: CompletedJob): number {
  return job.tip - getJobSubscriptionCost(job)
}

export function getStartingBalance(jobs: ReadonlyArray<CompletedJob>): number {
  const baseRate = jobs.reduce((total, job) => getJobGrandTotal(job) + total, 0)
  const additional = jobs.length >= HACK_MONEY_ACT ? HACK_MONEY_AMOUNT : 0
  return baseRate + additional
}

const dollarsAndCents = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2
})

const wholeDollars = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0
})

/**
 * Format a cents amount into a nice string
 * e.g. 250 -> "$2.50"
 *
 * Option to truncate cents (defaults to `false`)
 * e.g. 200 -> "$2" (not "$2.00")
 */
export function toDollars(cents: number, omitCents?: boolean): string {
  const dollars = Math.trunc(cents) / 100
  return omitCents === true
    ? wholeDollars.format(dollars)
    : dollarsAndCents.format(dollars)
}
