import { FunctionalComponent, h } from "preact"

interface TimeLimitDisplayProps {
  readonly startTime?: number
  // in seconds
  readonly timeLimit: number
  readonly isPaused: boolean
}

const TimeLimitDisplay: FunctionalComponent<TimeLimitDisplayProps> = props => {
  return props.startTime !== undefined ? (
    <>Time Left:{timeLeft(props.startTime, props.timeLimit)}</>
  ) : (
    <>Time Left: 🤔</>
  )
}

export function timeLeft(startTime: number, timeLimit: number): number {
  // convert to ms
  const timeLimitMs = timeLimit * 1000
  // format into whole seconds
  return Math.ceil((startTime + timeLimitMs - Date.now()) / 1000)
}

export default TimeLimitDisplay
