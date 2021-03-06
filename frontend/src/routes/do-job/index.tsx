import { FunctionalComponent, h } from "preact"
import Battle from "../../components/battle"
import { Link, route } from "preact-router"
import { useState, useCallback } from "preact/hooks"
import AutoAdvanceButton from "../../components/auto-advance-button"
import { useTypedSelector, pushCompletedJob, store } from "../../lib/store"
import * as style from "./style.css"
import { DoJobConfig, ActsConfig } from "../../lib/app-acts-config"
import { PotentialJob, completeJob } from "../../lib/job"
const {
  nextButton: { autoclickTimeout }
} = DoJobConfig

const getCurrentJob = (): PotentialJob => {
  const currentJob = useTypedSelector(state => state.currentJob)
  // this should really never be true, but just in case
  if (currentJob === null) {
    const { availableJobs } = ActsConfig[useTypedSelector(state => state.act)]
    return availableJobs[Math.floor(Math.random() * availableJobs.length)]
  }
  return currentJob
}

const DoJob: FunctionalComponent = () => {
  const job = getCurrentJob()

  const [isBattleFinished, setIsBattleFinished] = useState(false)

  const onBattleFinished = useCallback(
    (highScore: number) => {
      setIsBattleFinished(true)
      const completedJob = completeJob(job, highScore)
      store.dispatch(pushCompletedJob(completedJob))
    },
    [job]
  )

  return (
    <div class="content">
      <Battle trait={job.trait} onBattleFinished={onBattleFinished} />
      {isBattleFinished ? (
        <div className={style.autoAdvanceContainer}>
          <AutoAdvanceButton
            label="Next"
            autoClickTimeout={autoclickTimeout}
            onClick={() => route("/job-summary")}
          />
        </div>
      ) : null}
    </div>
  )
}

export default DoJob
