import { FunctionalComponent, h } from "preact"
import * as style from "./style.css"

interface JobScoreDisplayProps {
  /** Must be between 0 and 1.0 */
  readonly currentScore: number | undefined
  /** Must be between 0 and 1.0 */
  readonly highScore: number | undefined
}

const JobScoreDisplay: FunctionalComponent<JobScoreDisplayProps> = (
  props: JobScoreDisplayProps
) => {
  const ratingDegs =
    props.currentScore !== undefined ? props.currentScore * 180 - 90 : -90
  return (
    <div>
      <div className={style.ratingGaugeContainer}>
        <div className={style.ratingGaugeCommentContainer}>
          {props.highScore !== undefined && (
            <div className={style.ratingGaugeComment}>
              <div>{getScoreMessage(props.highScore)}</div>
              <div className={style.ratingGaugeValue}>
                {Math.floor(props.highScore * 100)}
              </div>
            </div>
          )}
        </div>
        <div
          className={style.ratingGauge}
          style={{ transform: `rotate(${ratingDegs}deg)` }}
        ></div>
      </div>
    </div>
  )
}

function getScoreMessage(score: number): string {
  if (score >= 0.99) return "Perfect"
  else if (score > 0.9) return "Amazing"
  else if (score > 0.8) return "Great job"
  else if (score > 0.4) return "Just okay"
  else if (score > 0.2) return "Do better"
  else return "Try harder"
}

/** Return a number between 0 and 1.0 */
export function normalizeValue(value: number, max: number): number {
  return value / max
}

export default JobScoreDisplay
