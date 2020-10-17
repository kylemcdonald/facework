import { FunctionalComponent, h } from "preact"
import Battle from "../../components/battle"
import { Link, route } from "preact-router"
import { useState } from "preact/hooks"
import AutoAdvanceButton from "../../components/auto-advance-button"
import { useTypedSelector } from "../../lib/store"
import { getRandomTraitLabel } from "../../lib/face-reader-labels"

import { DoJobConfig } from "../../lib/app-acts-config"
const {
  nextButton: { autoclickTimeout }
} = DoJobConfig

const DoJob: FunctionalComponent = () => {
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
          autoClickTimeout={autoclickTimeout}
          onClick={() => route("/job-summary")}
        />
      ) : null}
    </div>
  )
}

export default DoJob
