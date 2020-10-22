import { FunctionalComponent, h } from "preact"
import Battle from "../../components/battle"
import { Link, route } from "preact-router"
import { useState, useCallback } from "preact/hooks"
import AutoAdvanceButton from "../../components/auto-advance-button"
import { useTypedSelector, pushCompletedJob, store } from "../../lib/store"

import { DoJobConfig, ActsConfig } from "../../lib/app-acts-config"
import { BasicJob } from "../../lib/job"
const {
  nextButton: { autoclickTimeout }
} = DoJobConfig

const getCurrentJob = (): BasicJob => {
  const currentJob = useTypedSelector(state => state.currentJob)
  // this should really never be true, but just in case
  if (currentJob === null) {
    const { availableJobs } = ActsConfig[useTypedSelector(state => state.act)]
    return availableJobs[Math.round(Math.random() * availableJobs.length - 1)]
  }
  return currentJob
}

const DoJob: FunctionalComponent = () => {
  const job = getCurrentJob()

  const [isBattleFinished, setIsBattleFinished] = useState(false)

  const onBattleFinished = useCallback(
    (highScore: number) => {
      store.dispatch(pushCompletedJob({ ...job, highScore }))
      setIsBattleFinished(true)
    },
    [job]
  )

  return (
    <div>
      <h1>Do Job</h1>
      <p>
        <Link href={"/job-summary"}>Continue</Link>
      </p>
      <Battle trait={job.trait} onBattleFinished={onBattleFinished} />
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
