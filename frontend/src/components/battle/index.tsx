import { FunctionalComponent, h } from "preact"
import { useState, useCallback, useRef } from "preact/hooks"
import {
  useFaceReader,
  sendFace,
  FeatureRatingsData,
  FacePosition
} from "../../lib/use-face-reader"
import { ReadFaceResponse } from "../../workers/face-reader"
import VideoSelfie from "../../components/videoselfie"
import * as style from "./style.css"
import { isPastTimeLimit, sendFaceOrSchedule } from "./helpers"
import { TraitLabel } from "../../lib/face-reader-labels"
import TimeLimitDisplay from "../time-limit-display"
import JobScoreDisplay from "../job-score-display"

import { addMessage } from "../../lib/logging"
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
  /** track the sequence of model outputs */
  readonly modelHistory: (number | null)[]
  readonly detectorDurations: number[]
  readonly modelDurations: (number | null)[]
  readonly facePositions: (FacePosition | null)[]
}

const InitKeyFeatureScoring = (): KeyFeatureScoring => ({
  score: 0,
  highestScore: 0,
  timeLimit: scoringTimeLimit,
  modelHistory: [],
  detectorDurations: [],
  modelDurations: [],
  facePositions: [[]]
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
    (ratings: FeatureRatingsData | null, response: ReadFaceResponse): void => {
      let keepGoing = true
      let latestHighScore = keyFeatureScoring.highestScore
      setFeatureRatingsData(ratings)
      setKeyFeatureScoring(prev => {
        // we always want to return performance metrics
        const baseOutput = {
          ...prev,
          detectorDurations: prev.detectorDurations.concat(
            response.detectorDuration
          ),
          modelDurations: prev.modelDurations.concat(response.modelDuration),
          facePositions: prev.facePositions.concat([response.facePosition])
        }
        // if no new ratings, don't update the score
        if (ratings === null) {
          return {
            ...baseOutput,
            modelHistory: prev.modelHistory.concat(null)
          }
        }
        const modelOutput = ratings.expressions.get(props.trait) ?? null
        // if we have previous ratings, we're in the middle of the round
        if (prev.feature !== undefined) {
          // pulled straight from the tf model results
          const rawMomentaryScore = modelOutput ?? 0
          // blended with previous score to smooth data
          const blendedScore = rawMomentaryScore * 0.7 + prev.score * 0.3
          latestHighScore = Math.max(prev.highestScore, blendedScore)
          keepGoing = !isPastTimeLimit(prev)
          if (!keepGoing) {
            // report performance metrics
            addMessage("job-performance", {
              trait: props.trait,
              modelHistory: prev.modelHistory,
              detectorDurations: prev.detectorDurations,
              modelDurations: prev.modelDurations,
              facePositions: prev.facePositions
            })
          }
          return {
            ...baseOutput,
            score: blendedScore,
            highestScore: latestHighScore,
            modelHistory: prev.modelHistory.concat(modelOutput)
          }
        }
        // otherwise, init
        keepGoing = true
        console.debug(`setting key feature to ${props.trait}`)
        return {
          ...prev,
          feature: props.trait,
          startTime: Date.now(),
          modelHistory: [modelOutput],
          detectorDurations: [response.detectorDuration],
          modelDurations: [response.modelDuration],
          facePositions: [response.facePosition]
        }
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
