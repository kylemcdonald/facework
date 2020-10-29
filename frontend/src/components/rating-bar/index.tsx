import { FunctionalComponent, h } from "preact"
import * as style from "./style.css"

interface RatingBarProps {
  /** Must be between 0 and 1.0 */
  readonly value: number | undefined
}

const RatingBar: FunctionalComponent<RatingBarProps> = (
  props: RatingBarProps
) => {
  const ratingDegs = props.value !== undefined ? props.value * 180 - 90 : -90
  return (
    <div>
      <div className={style.ratingGaugeContainer}>
        <div className={style.ratingGaugeCommentContainer}>
          {props.value !== undefined && (
            <div className={style.ratingGaugeComment}>
              <div>Great Job!</div>
              <div className={style.ratingGaugeValue}>
                {Math.floor(props.value * 100)}
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

/** Return a number between 0 and 1.0 */
export function normalizeValue(value: number, max: number): number {
  return value / max
}

export default RatingBar
