import { FunctionalComponent, h } from "preact"
import * as FaceReader from "../../lib/face-reader"
import RatingBar from "../rating-bar"
import * as style from "./style.css"

interface FeatureRatingsProps {
  data: FaceReader.FeatureRatingsData | null
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
        <ul>
          <li key="age">
            <b>age:</b> {props.data.age}
          </li>
          <li key="gender">
            <b>{props.data.gender.gender}:</b>
            {` ${props.data.gender.probability}`}
          </li>
          {expressionsValues}
        </ul>
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
