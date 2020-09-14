import { FunctionalComponent, h } from "preact"
import { useState, useCallback, useRef } from "preact/hooks"
import {
  useFaceReader,
  sendFace,
  FeatureRatingsData
} from "../../lib/use-face-reader"
import VideoSelfie from "../../components/videoselfie"
import FeatureRatings from "../../components/feature-ratings"
import * as style from "./style.css"
import { isPastTimeLimit } from "./helpers"
import BattleStatus from "../../components/versus-status"
import { TraitLabel } from "../../lib/face-reader-labels"

export type KeyFeatureScoring = {
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
  score: Number.MIN_VALUE,
  timeLimit: 30,
  decayRate: 0.025
})

interface BattleProps {
  /** Get Trait to start with, chosen by user */
  getInitialTrait: () => TraitLabel | undefined
}

const Battle: FunctionalComponent<BattleProps> = props => {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const onPlay = useCallback((input: HTMLVideoElement) => {
    videoRef.current = input
    sendFace(videoRef.current)
  }, [])
  const [
    featureRatingsData,
    setFeatureRatingsData
  ] = useState<FeatureRatingsData | null>(null)
  const [keyFeatureScoring, setKeyFeatureScoring] = useState<KeyFeatureScoring>(
    InitKeyFeatureScoring()
  )
  const updateFeatureRatings = useCallback(
    (ratings: FeatureRatingsData | null): void => {
      let keepGoing = true
      setFeatureRatingsData(ratings)
      setKeyFeatureScoring(prev => {
        // if no new ratings, don't update the score
        if (ratings === null) {
          return prev
        }
        if (prev.feature !== undefined) {
          // 10 is a magic number here, totally arbitrary
          const additive = (ratings.expressions.get(prev.feature) ?? 0) / 10
          // never go below MIN_VALUE
          const newScore = Math.max(
            prev.score + additive - prev.decayRate,
            Number.MIN_VALUE
          )
          keepGoing = newScore < 1.0 && !isPastTimeLimit(prev)
          return {
            ...prev,
            score: newScore
          }
        }
        // otherwise, init
        keepGoing = true
        const keys = Array.from(ratings.expressions.keys())
        const newKey =
          props.getInitialTrait() ??
          keys[Math.round(Math.random() * keys.length - 1)]
        console.debug(`setting key feature to ${newKey}`)
        return { ...prev, feature: newKey, startTime: Date.now() }
      })

      if (keepGoing && videoRef.current !== null) {
        sendFace(videoRef.current)
      }
    },
    [setKeyFeatureScoring]
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
          <BattleStatus
            key={"status"}
            scoring={keyFeatureScoring}
            isFaceDetected={featureRatingsData === null}
          />
          <details>
            <summary>Realtime ratings</summary>
            <FeatureRatings data={featureRatingsData} />
          </details>
        </section>
      </div>
    </main>
  )
}

export default Battle
