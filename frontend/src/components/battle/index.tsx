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
import JobScoreDisplay from "../job-score-display"

import { DoJobConfig } from "../../lib/app-acts-config"
const { scoringTimeLimit } = DoJobConfig

/** Displays dotted circle and feature text */
const FaceHint: FunctionalComponent<{
  feature: string
  isFaceNotFound: boolean
}> = props =>
  props.isFaceNotFound ? (
    <div class={style.faceHintContainer}>
      <div class={style.faceHintHelp}>
        <span class={style.faceHintHelpHeadline}>FACE NOT FOUND</span>
        <span>Try moving closer to the screen</span>
      </div>
    </div>
  ) : (
    <>
      <div class={style.faceHintContainer}>
        <div class={style.faceHintShadow}></div>
      </div>
      <div class={style.faceHintContainer}>
        <div class={style.faceHint}>{props.feature}</div>
      </div>
    </>
  )

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
        // if we have previous ratings, we're in the middle of the round
        if (prev.feature !== undefined) {
          // pulled straight from the tf model results
          const rawMomentaryScore =
            ratings.expressions.get(prev.feature) ?? Number.MIN_VALUE
          // blended with previous score to smooth data
          const blendedScore = rawMomentaryScore * 0.7 + prev.score * 0.3
          latestHighScore = Math.max(prev.highestScore, blendedScore)
          keepGoing = !isPastTimeLimit(prev)
          return {
            ...prev,
            score: blendedScore,
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
      <FaceHint
        feature={keyFeatureScoring.feature ?? ""}
        isFaceNotFound={featureRatingsData === null}
      />
      <section class={style.accompaniment}>
        <TimeLimitDisplay
          timeLimit={keyFeatureScoring.timeLimit}
          started={keyFeatureScoring.startTime !== undefined}
          isPaused={false}
        />
        <JobScoreDisplay
          key="progress"
          currentScore={keyFeatureScoring.score}
          highScore={keyFeatureScoring.highestScore}
        />
      </section>
      <VideoSelfie
        key="selfie"
        onPlay={onPlay}
        isBlurred={keyFeatureScoring.startTime === undefined}
      />
    </div>
  )
}

export default Battle
