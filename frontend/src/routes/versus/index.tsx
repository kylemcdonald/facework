import { FunctionalComponent, h } from "preact"
import Battle from "../../components/battle"
import { Link, route } from "preact-router"
import { useState } from "preact/hooks"
import AutoAdvanceButton from "../../components/auto-advance-button"
import { useTypedSelector } from "../../lib/store"
import { getRandomTraitLabel } from "../../lib/face-reader-labels"

const Versus: FunctionalComponent = () => {
  const trait = useTypedSelector(state => state.trait) ?? getRandomTraitLabel()

  const [isBattleFinished, setIsBattleFinished] = useState(false)

  return (
    <div>
      <h1>Do Job</h1>
      <p>
        <Link href={"/job-summary"}>Continue</Link>
      </p>
      <Battle
        trait={trait}
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
