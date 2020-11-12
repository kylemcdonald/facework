import { FunctionalComponent, h } from "preact"
import * as style from "./style.css"
import { KeyFeatureScoring } from "../battle"
import TimeLimitDisplay from "../time-limit-display"
import { isPastTimeLimit } from "../battle/helpers"

interface BattleStatusProps {
  readonly isFaceDetected: boolean
  readonly scoring: KeyFeatureScoring
}

const BattleStatus: FunctionalComponent<BattleStatusProps> = props => {
  const { scoring, isFaceDetected } = props
  return (
    <span class={style.selfieStatus}>
      {scoring.feature === undefined ? (
        <>
          {`👀 Hmm, what do we have here...?`}
          <br />
          <progress key="progress" value={undefined} />
        </>
      ) : isPastTimeLimit(scoring) ? (
        <>
          {`🥳 WOW! That was some great `}
          <strong>{scoring.feature}</strong>.
          <br />
          Have a tip! ({`rating: ${scoring.highestScore}`})
        </>
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
          <progress key="progress" value={scoring.score} />
          <br />
          <TimeLimitDisplay
            timeLimit={scoring.timeLimit}
            started={scoring.startTime !== undefined}
            isPaused={false}
          />
        </>
      )}
    </span>
  )
}

export default BattleStatus
