import { FunctionalComponent, h } from "preact"
import { useState, useCallback, useRef } from "preact/hooks"
import * as style from "./style.css"
import VideoSelfie from "../../components/videoselfie"
import RatingBar from "../../components/rating-bar"
import FeatureRatings from "../../components/feature-ratings"
import {
  useFaceReader,
  sendFace,
  FeatureRatingsData
} from "../../lib/face-reader-worker-relay"

const Versus: FunctionalComponent = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const onPlay = useCallback((input: HTMLVideoElement) => {
    videoRef.current = input
    sendFace(videoRef.current)
  }, [])
  const [
    featureRatingsData,
    setFeatureRatingsData
  ] = useState<FeatureRatingsData | null>(null)
  const [keyFeatureScore, setKeyFeatureScore] = useState<
    { feature: string; score: number } | undefined
  >(undefined)
  const updateFeatureRatings = useCallback(
    (ratings: FeatureRatingsData | null) => {
      setFeatureRatingsData(ratings)
      let shouldSendAgain = false
      if (ratings !== null) {
        setKeyFeatureScore(prev => {
          if (prev !== undefined) {
            // 10 is a magic number here, totally arbitrary
            const additive = (ratings.expressions.get(prev.feature) || 0) / 10
            const newScore = prev.score + additive
            if (newScore < 1.0) {
              shouldSendAgain = true
            }
            return { ...prev, score: newScore }
          }
          // otherwise, init
          shouldSendAgain = true
          const keys = Array.from(ratings.expressions.keys())
          const newKey = keys[Math.round(Math.random() * keys.length - 1)]
          console.debug(`setting key feature to ${newKey}`)
          return { feature: newKey, score: 0 }
        })
      }
      if (shouldSendAgain && videoRef.current !== null) {
        sendFace(videoRef.current)
      }
    },
    [setKeyFeatureScore]
  )
  useFaceReader(updateFeatureRatings)
  return (
    <main class={style.versus}>
      <h1>Versus</h1>
      <p>
        Get ready to <em>FACE OFF</em>.
      </p>
      <div class={style.flexRowWrap}>
        <div class={style.videoSelfieWrapper}>
          <VideoSelfie key="selfie" onPlay={onPlay} />
        </div>
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
                {featureRatingsData === null && (
                  <>
                    {`🕵🏼‍♀️ Wait, where'd you go?`}
                    <br />
                  </>
                )}
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
