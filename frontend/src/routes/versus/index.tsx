import { FunctionalComponent, h } from "preact"
import { useEffect, useState, useCallback } from "preact/hooks"
import * as style from "./style.css"
import VideoSelfie from "../../components/videoselfie"
import * as FaceReader from "../../lib/face-reader"
import RatingBar from "../../components/rating-bar"
import FeatureRatings from "../../components/feature-ratings"

const Versus: FunctionalComponent = () => {
  useEffect(() => {
    FaceReader.initialize()
  }, [])
  const [
    featureRatingsData,
    setFeatureRatingsData
  ] = useState<FaceReader.FeatureRatingsData | null>(null)
  const [keyFeatureScore, setKeyFeatureScore] = useState<
    { feature: string; score: number } | undefined
  >(undefined)
  const updateFeatureRatings = useCallback(
    (ratings: FaceReader.FeatureRatingsData | null) => {
      setFeatureRatingsData(ratings)
      if (ratings !== null) {
        setKeyFeatureScore(prev => {
          if (prev !== undefined) {
            const additive = (ratings.expressions.get(prev.feature) || 0) / 10
            return { ...prev, score: prev.score + additive }
          }
          // otherwise, init
          const keys = Array.from(ratings.expressions.keys())
          const newKey = keys[Math.round(Math.random() * keys.length - 1)]
          console.log(`setting key feature to ${newKey}`)
          return { feature: newKey, score: 0 }
        })
      }
    },
    [setKeyFeatureScore]
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
            {keyFeatureScore === undefined ? (
              <>
                {`👀 Hmm, what do we have here...?`}
                <br />
                <RatingBar key="progress" value={undefined} />
              </>
            ) : keyFeatureScore.score < 1.0 ? (
              <>
                {`💁‍♀️ Okay, let's see some `}
                <strong>{keyFeatureScore.feature}</strong>
                <br />
                <RatingBar key="progress" value={keyFeatureScore.score} />
              </>
            ) : (
              <>
                {`🥳 WOW! That was some great `}
                <strong>{keyFeatureScore.feature}</strong>.
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
