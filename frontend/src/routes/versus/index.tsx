import { FunctionalComponent, h } from "preact"
import { useEffect, useState, useCallback } from "preact/hooks"
import * as style from "./style.css"
import VideoSelfie from "../../components/videoselfie"
import * as face from "../../lib/vision"

interface FeatureRatingsProps {
  data: face.FeatureRatingsData | null
}

const FeatureRatings: FunctionalComponent<FeatureRatingsProps> = (
  props: FeatureRatingsProps
) => {
  if (props.data !== null) {
    return (
      <div>
        <ul>
          <li>
            <b>age:</b> {props.data.age}
          </li>
          <li>
            <b>gender:</b> {props.data.gender}
          </li>
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
      <VideoSelfie onPlay={scheduleDetection} />
      <FeatureRatings data={featureRatingsData} />
    </div>
  )
}

export default Versus
