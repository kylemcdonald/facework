import { FunctionalComponent, h } from "preact"
import { useEffect, useState, useCallback } from "preact/hooks"
import * as style from "./style.css"
import VideoSelfie from "../../components/videoselfie"
import * as FaceReader from "../../lib/face-reader"
import RatingBar from "../../components/rating-bar"
import FeatureRatings from "../../components/feature-ratings"
import TimeLimitDisplay from "../../components/time-limit-display"

type KeyFeatureScoring = {
  /** the name of the feature we are judging */
  feature?: string
  /** the current score (between 0 and 1) */
  score: number
  /** how long does the user have to win this round? (in seconds) */
  timeLimit: number
  /** when did this round start? set with Date.now() */
  startTime?: number
  /** how much do we subtract from the score every detection frame? */
  decayRate: number
}

const InitKeyFeatureScoring = (): KeyFeatureScoring => ({
  score: 0,
  timeLimit: 60,
  decayRate: 0.05
})

const Versus: FunctionalComponent = () => {
  useEffect(() => {
    FaceReader.initialize()
  }, [])
  const [
    featureRatingsData,
    setFeatureRatingsData
  ] = useState<FaceReader.FeatureRatingsData | null>(null)
  const [keyFeatureScoring, setKeyFeatureScoring] = useState<KeyFeatureScoring>(
    InitKeyFeatureScoring()
  )
  const updateFeatureRatings = useCallback(
    (ratings: FaceReader.FeatureRatingsData | null) => {
      setFeatureRatingsData(ratings)
      if (ratings !== null) {
        setKeyFeatureScoring(prev => {
          if (prev.feature !== undefined) {
            // 10 is a magic number here, totally arbitrary
            const additive = (ratings.expressions.get(prev.feature) || 0) / 10
            return { ...prev, score: prev.score + additive }
          }
          // otherwise, init
          const keys = Array.from(ratings.expressions.keys())
          const newKey = keys[Math.round(Math.random() * keys.length - 1)]
          console.debug(`setting key feature to ${newKey}`)
          return { ...prev, feature: newKey }
        })
      }
    },
    [setKeyFeatureScoring]
  )
  const scheduleDetection = useCallback(
    (input: HTMLVideoElement) => {
      FaceReader.scheduleDetection(input, updateFeatureRatings)
      setKeyFeatureScoring(prev => ({ ...prev, startTime: Date.now() }))
    },
    [updateFeatureRatings]
  )
  return (
    <main class={style.versus}>
      <h1>Versus</h1>
      <p>
        Get ready to <em>FACE OFF</em>.
      </p>
      <div class={style.flexRowWrap}>
        <div class={style.videoSelfieWrapper}>
          <VideoSelfie key="selfie" onPlay={scheduleDetection} />
        </div>
        <section class={style.accompaniment}>
          <span class={style.selfieStatus}>
            {keyFeatureScoring === undefined ? (
              <>
                {`👀 Hmm, what do we have here...?`}
                <br />
                <RatingBar key="progress" value={undefined} />
              </>
            ) : keyFeatureScoring.score < 1.0 ? (
              <>
                {`💁‍♀️ Okay, let's see some `}
                <strong>{keyFeatureScoring.feature}</strong>
                <br />
                {featureRatingsData === null && (
                  <>
                    {`🕵🏼‍♀️ Wait, where'd you go?`}
                    <br />
                  </>
                )}
                <RatingBar key="progress" value={keyFeatureScoring.score} />
                <br />
                <TimeLimitDisplay
                  timeLimit={keyFeatureScoring.timeLimit}
                  startTime={keyFeatureScoring.startTime}
                  isPaused={false}
                />
              </>
            ) : (
              <>
                {`🥳 WOW! That was some great `}
                <strong>{keyFeatureScoring.feature}</strong>.
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
