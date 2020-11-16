import { FunctionalComponent, h } from "preact"
import * as style from "./style.css"
import { useCountdownTimer } from "../../lib/use-countdown-timer"

interface TimeLimitDisplayProps {
  readonly started: boolean
  // in milliseconds
  readonly timeLimit: number
  readonly isPaused: boolean
}

const TimeLimitDisplay: FunctionalComponent<TimeLimitDisplayProps> = props => {
  const ratioTimeLeft = props.started ? useCountdownTimer(props.timeLimit) : 1.0
  const barWidth = Math.pow(ratioTimeLeft, 1.2) * 100
  return (
    <div>
      <div className={style.progressBarContainer}>
        <div
          className={style.progressBarFill}
          style={{ width: `${barWidth}%` }}
        />
      </div>
    </div>
  )
}

export default TimeLimitDisplay
