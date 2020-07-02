import { FunctionalComponent, h } from "preact"
import { useEffect, useState, useCallback } from "preact/hooks"
import * as style from "./style.css"
import VideoSelfie from "../../components/videoselfie"
import * as face from "../../lib/face-reader"
import FeatureRating from "../../components/feature-rating"

interface FeatureRatingsProps {
  data: face.FeatureRatingsData | null
}

const FeatureRatings: FunctionalComponent<FeatureRatingsProps> = (
  props: FeatureRatingsProps
) => {
  if (props.data !== null) {
    const expressionsValues = new Array<JSX.Element>()
    for (const [k, v] of props.data.expressions) {
      expressionsValues.push(
        <li key={k}>
          <b>{k}:</b> <FeatureRating value={v} />
          <span className="percentage">{` ${Math.trunc(v * 100)}%`}</span>
        </li>
      )
    }
    return (
      <div>
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

const Versus: FunctionalComponent = () => {
  useEffect(() => {
    face.initialize()
  }, [])
  const [
    featureRatingsData,
    setFeatureRatingsData
  ] = useState<face.FeatureRatingsData | null>(null)
  const scheduleDetection = useCallback(
    (input: HTMLVideoElement) =>
      face.scheduleDetection(input, setFeatureRatingsData),
    [setFeatureRatingsData]
  )
  return (
    <div class={style.versus}>
      <h1>Versus</h1>
      <p>
        Get ready to <em>FACE OFF</em>.
      </p>
      <section>
        <VideoSelfie onPlay={scheduleDetection} />
        <FeatureRatings data={featureRatingsData} />
      </section>
    </div>
  )
}

export default Versus
