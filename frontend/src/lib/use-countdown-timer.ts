import { useState, useEffect } from "preact/hooks"

/**
 * Runs a countdown timer
 *
 * @returns ratio of time left (from 1.0 down to 0)
 */
export const useCountdownTimer = (
  /** How long before the countdown is over, in *milliseconds* */
  timeLimit: number,
  /** Callback for when the countdown is over */
  onTimeLimitReached?: () => void
): number => {
  const [timeLeftRatio, setTimeLeftRatio] = useState(1)
  useEffect(() => {
    const startTime = Date.now()
    const intervalId = setInterval(() => {
      const newTimeLeftRatio = 1 - (Date.now() - startTime) / timeLimit
      if (newTimeLeftRatio <= 0) {
        clearInterval(intervalId)
        if (onTimeLimitReached !== undefined) {
          onTimeLimitReached()
        }
      }
      setTimeLeftRatio(newTimeLeftRatio)
    }, 150)
    return (): void => clearInterval(intervalId)
  }, [timeLimit])
  return timeLeftRatio
}
