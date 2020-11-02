import { FunctionalComponent, h } from "preact"
import { useState, useCallback, useRef } from "preact/hooks"
import {
  useFaceReader,
  sendFace,
  FeatureRatingsData
} from "../../lib/use-face-reader"
import VideoSelfie from "../../components/videoselfie"
import * as style from "./style.css"
import { isPastTimeLimit, sendFaceOrSchedule } from "./helpers"
import { TraitLabel } from "../../lib/face-reader-labels"
import TimeLimitDisplay from "../time-limit-display"
import RatingBar from "../rating-bar"

import { DoJobConfig } from "../../lib/app-acts-config"
const { scoringTimeLimit } = DoJobConfig

export type KeyFeatureScoring = {
  /** the name of the feature we are judging */
  readonly feature?: string
  /** the current score (between 0 and 1) */
  readonly score: number
  /** highest score from this round (between 0 and 1) */
  readonly highestScore: number
  /** how long does the user have to win this round? (in milliseconds) */
  readonly timeLimit: number
  /** when did this round start? set with Date.now() */
  readonly startTime?: number
}

const InitKeyFeatureScoring = (): KeyFeatureScoring => ({
  score: Number.MIN_VALUE,
  highestScore: Number.MIN_VALUE,
  timeLimit: scoringTimeLimit
})

interface BattleProps {
  /** Trait, chosen by user */
  readonly trait: TraitLabel
  /** Callback when the battle timer ends */
  readonly onBattleFinished: (highScore: number) => void
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
      let latestHighScore = keyFeatureScoring.highestScore
      setFeatureRatingsData(ratings)
      setKeyFeatureScoring(prev => {
        // if no new ratings, don't update the score
        if (ratings === null) {
          return prev
        }
        if (prev.feature !== undefined) {
          const score =
            ratings.expressions.get(prev.feature) ?? Number.MIN_VALUE
          latestHighScore = Math.max(prev.highestScore, score)
          keepGoing = !isPastTimeLimit(prev)
          return {
            ...prev,
            score,
            highestScore: latestHighScore
          }
        }
        // otherwise, init
        keepGoing = true
        console.debug(`setting key feature to ${props.trait}`)
        return { ...prev, feature: props.trait, startTime: Date.now() }
      })

      if (!keepGoing) {
        props.onBattleFinished(latestHighScore)
      } else if (keepGoing && videoRef.current !== null) {
        sendFaceOrSchedule(videoRef.current)
      }
    },
    [setKeyFeatureScoring]
  )
  useFaceReader(updateFeatureRatings)
  return (
    <div class={style.battle}>
      <div className={style.faceHintContainer}>
        <div className={style.faceHint}>{keyFeatureScoring.feature}</div>
      </div>
      <section class={style.accompaniment}>
        <TimeLimitDisplay
          timeLimit={keyFeatureScoring.timeLimit}
          started={keyFeatureScoring.startTime !== undefined}
          isPaused={false}
        />
        <RatingBar key="progress" value={keyFeatureScoring.score} />
      </section>
      <div class={style.videoSelfieWrapper}>
        <VideoSelfie key="selfie" onPlay={onPlay} />
      </div>
    </div>
  )
}

export default Battle
