import { useState, useEffect } from "preact/hooks"

export const useCountdownTimer = (
  /** How long before the countdown is over, in *milliseconds* */
  timeLimit: number,
  /** Callback for when the countdown is over */
  onTimeLimitReached: () => void
): number => {
  const [timeLeftRatio, setTimeLeftRatio] = useState(1)
  useEffect(() => {
    const startTime = Date.now()
    const intervalId = setInterval(() => {
      const newTimeLeftRatio = 1 - (Date.now() - startTime) / timeLimit
      if (newTimeLeftRatio <= 0) {
        clearInterval(intervalId)
        onTimeLimitReached()
      }
      setTimeLeftRatio(newTimeLeftRatio)
    }, 150)
    return (): void => clearInterval(intervalId)
  }, [timeLimit])
  return timeLeftRatio
}
