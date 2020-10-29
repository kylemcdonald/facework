import { FunctionalComponent, h } from "preact"
import * as style from "./style.css"

interface TimeLimitDisplayProps {
  readonly startTime?: number
  // in seconds
  readonly timeLimit: number
  readonly isPaused: boolean
}

const TimeLimitDisplay: FunctionalComponent<TimeLimitDisplayProps> = props => {
  const secondsLeft =
    props.startTime !== undefined
      ? timeLeft(props.startTime, props.timeLimit)
      : props.timeLimit
  const percentLeft = 100 - (secondsLeft / props.timeLimit) * 100

  return props.startTime !== undefined ? (
    <div>
      <div className={style.progressBarContainer}>
        <div
          className={style.progressBarFill}
          style={{ width: `${percentLeft}%` }}
        />
      </div>
    </div>
  ) : (
    <div> </div>
  )
}

export function timeLeft(startTime: number, timeLimit: number): number {
  // convert to ms
  const timeLimitMs = timeLimit * 1000
  // format into whole seconds
  return Math.ceil((startTime + timeLimitMs - Date.now()) / 1000)
}

export default TimeLimitDisplay
