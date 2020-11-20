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
  const highScoreDegs =
    props.highScore !== undefined ? props.highScore * 180 - 90 : -90
  const highScore = props.highScore ?? 0
  const highScorePct = Math.floor(100 * highScore)
  const highScoreMsg = getScoreMessage(highScore)
  return (
    <div>
      <div className={style.ratingGaugeContainer}>
        <div className={style.ratingGaugeCommentContainer}>
          {props.highScore !== undefined && (
            <div className={style.ratingGaugeComment}>
              <div className={style.ratingGaugeCommentOnly} key={highScoreMsg}>
                {highScoreMsg}
              </div>
              <div className={style.ratingGaugeValue} key={highScorePct}>
                {highScorePct}
              </div>
            </div>
          )}
        </div>
        <div
          className={`${style.ratingGauge} ${style.ratingGaugeGreen}`}
          style={{ transform: `rotate(${highScoreDegs}deg) scale(1.1)` }}
        ></div>
        <div
          className={`${style.ratingGauge} ${style.ratingGaugeWhite}`}
          style={{ transform: `rotate(${ratingDegs}deg)` }}
        ></div>
      </div>
    </div>
  )
}

function getScoreMessage(score: number): string {
  if (score >= 0.99) return "Perfect"
  else if (score > 0.9) return "Well Done"
  else if (score > 0.8) return "Just Okay"
  else if (score > 0.4) return "Barely Enough"
  else if (score > 0.2) return "Do Better"
  else return "Try Harder"
}

/** Return a number between 0 and 1.0 */
export function normalizeValue(value: number, max: number): number {
  return value / max
}

export default JobScoreDisplay
