import { FunctionalComponent, h } from "preact"
import * as style from "./style.css"
import { KeyFeatureScoring } from "../../routes/versus"
import RatingBar from "../rating-bar"
import TimeLimitDisplay from "../time-limit-display"
import { isPastTimeLimit } from "../../routes/versus/helpers"

interface VersusStatusProps {
  isFaceDetected: boolean
  scoring: KeyFeatureScoring
}

const VersusStatus: FunctionalComponent<VersusStatusProps> = props => {
  const { scoring, isFaceDetected } = props
  return (
    <span class={style.selfieStatus}>
      {scoring.feature === undefined ? (
        <>
          {`👀 Hmm, what do we have here...?`}
          <br />
          <RatingBar key="progress" value={undefined} />
        </>
      ) : scoring.score >= 1.0 ? (
        <>
          {`🥳 WOW! That was some great `}
          <strong>{scoring.feature}</strong>.
        </>
      ) : isPastTimeLimit(scoring) ? (
        <>{`🙅‍♀️ Yikes! You're out of time!`}</>
      ) : (
        <>
          {`💁‍♀️ Okay, let's see some `}
          <strong>{scoring.feature}</strong>
          <br />
          {isFaceDetected && (
            <>
              {`🕵🏼‍♀️ Wait, where'd you go?`}
              <br />
            </>
          )}
          <RatingBar key="progress" value={scoring.score} />
          <br />
          <TimeLimitDisplay
            timeLimit={scoring.timeLimit}
            startTime={scoring.startTime}
            isPaused={false}
          />
        </>
      )}
    </span>
  )
}

export default VersusStatus
