import { FunctionalComponent, h } from "preact"
import Battle from "../../components/battle"
import { Link, route } from "preact-router"
import { useCallback, useState } from "preact/hooks"
import { isTraitLabel } from "../../lib/face-reader-labels"
import AutoAdvanceButton from "../../components/auto-advance-button"

interface VersusProps {
  readonly trait?: string
}

const Versus: FunctionalComponent<VersusProps> = props => {
  const getInitialTrait = useCallback(
    () => (isTraitLabel(props.trait) ? props.trait : undefined),
    [props.trait]
  )
  const [isBattleFinished, setIsBattleFinished] = useState(false)

  return (
    <div>
      <h1>Do Job</h1>
      <p>
        <Link href={"/job-summary"}>Continue</Link>
      </p>
      <Battle
        getInitialTrait={getInitialTrait}
        onBattleFinished={() => setIsBattleFinished(true)}
      />
      {isBattleFinished ? (
        <AutoAdvanceButton
          label="Next"
          timeLimit={3000}
          onClick={() => route("/job-summary")}
        />
      ) : null}
    </div>
  )
}

export default Versus
