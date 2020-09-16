import { FunctionalComponent, h } from "preact"
import RatingBar from "../rating-bar"
import * as style from "./style.css"
import { FeatureRatingsData } from "../../lib/use-face-reader"

interface FeatureRatingsProps {
  readonly data: FeatureRatingsData | null
}

const FeatureRatings: FunctionalComponent<FeatureRatingsProps> = (
  props: FeatureRatingsProps
) => {
  if (props.data !== null) {
    const expressionsValues = new Array<JSX.Element>()
    for (const [k, v] of props.data.expressions) {
      expressionsValues.push(
        <li key={k}>
          <b>{k}:</b> <RatingBar value={v} />
          <span className="percentage">{` ${Math.trunc(v * 100)}%`}</span>
        </li>
      )
    }
    return (
      <div class={style.featureRatings}>
        <ul>{expressionsValues}</ul>
      </div>
    )
  }
  return (
    <div>
      <i>waiting...</i>
    </div>
  )
}

export default FeatureRatings
