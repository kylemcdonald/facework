import { FunctionalComponent, h } from "preact"
import { useEffect, useState, useCallback } from "preact/hooks"
import * as style from "./style.css"
import VideoSelfie from "../../components/videoselfie"
import * as FaceReader from "../../lib/face-reader"
import RatingBar from "../../components/rating-bar"
import FeatureRatings from "../../components/feature-ratings"

const keyFeatures = [
  "neutral",
  "happy",
  "sad",
  "angry",
  "fearful",
  "disgusted",
  "surprised"
]

const Versus: FunctionalComponent = () => {
  useEffect(() => {
    FaceReader.initialize()
  }, [])
  const [
    featureRatingsData,
    setFeatureRatingsData
  ] = useState<FaceReader.FeatureRatingsData | null>(null)
  const [keyFeature, setKeyFeature] = useState<string>(
    keyFeatures[Math.round(Math.random() * keyFeatures.length - 1)]
  )
  const [currentScore, setCurrentScore] = useState<number>(0)
  const updateFeatureRatings = useCallback(
    (ratings: FaceReader.FeatureRatingsData | null) => {
      setFeatureRatingsData(ratings)
      if (ratings !== null) {
        const additive = (ratings.expressions.get(keyFeature) || 0) / 10
        setCurrentScore(prev => prev + additive)
      }
    },
    [keyFeature, setCurrentScore]
  )
  const scheduleDetection = useCallback(
    (input: HTMLVideoElement) =>
      FaceReader.scheduleDetection(input, updateFeatureRatings),
    [updateFeatureRatings]
  )
  return (
    <main class={style.versus}>
      <h1>Versus</h1>
      <p>
        Get ready to <em>FACE OFF</em>.
      </p>
      <div class={style.flexRowWrap}>
        <VideoSelfie key="selfie" onPlay={scheduleDetection} />
        <section class={style.accompaniment}>
          <span class={style.selfieStatus}>
            {currentScore < 1.0 ? (
              <>
                {`💁‍♀️ Okay, let's see some `}
                <strong>{keyFeature}</strong>
                <br />
                <RatingBar value={currentScore} />
              </>
            ) : (
              <>
                {`🥳 WOW! That was some great `}
                <strong>{keyFeature}</strong>.
              </>
            )}
          </span>
          <details>
            <summary>Realtime ratings</summary>
            <FeatureRatings data={featureRatingsData} />
          </details>
        </section>
      </div>
    </main>
  )
}

export default Versus
