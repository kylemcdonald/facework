import { FunctionalComponent, h } from "preact"
import { route } from "preact-router"
import AutoAdvanceButton from "../../components/auto-advance-button"
import { useTypedSelector } from "../../lib/store"
import { toDollars } from "../../lib/job"
import Chat from "../chat"
import * as style from "./style.css"

import { JobSummaryConfig } from "../../lib/app-acts-config"
import { useState } from "preact/hooks"
const {
  nextButton: { autoclickTimeout }
} = JobSummaryConfig

const JobSummary: FunctionalComponent = () => {
  const [showChat, setShowChat] = useState(false)
  const completedJobs = useTypedSelector(state => state.completedJobs)
  const lastJob = completedJobs[completedJobs.length - 1]
  return (
    <div>
      {showChat && <Chat />}
      <div class={style.jobSummaryBody}>
        <h1>Job Summary</h1>
        <div>
          <div className={style.jobSummaryLineItem}>
            <span>{lastJob.name}</span>
            <span>{toDollars(lastJob.basePay)}</span>
          </div>
          <div className={style.jobSummaryLineItem}>
            <span>Total Customer Tips</span>
            <span>{toDollars(lastJob.tip)}</span>
          </div>
          <div className={style.jobSummaryLineItem}>
            <span>APP Subscription</span>
            <span>{toDollars(lastJob.basePay + lastJob.tip)}</span>
          </div>
        </div>
        <div className={style.jobSummaryLineItemsSeparator} />
        <div className={style.jobSummaryGrandTotalContainer}>
          <div className={style.jobSummaryLineItem}>
            <span className={style.jobSummaryGrandTotalHeader}>
              Grand Total
            </span>
            <span className={style.jobSummaryGrandTotal}>$0</span>
          </div>
        </div>
        <AutoAdvanceButton
          label="Next"
          autoClickTimeout={autoclickTimeout}
          onClick={() => setShowChat(true)}
        />
      </div>
      <div className={style.jobSummaryFooter}>See all new jobs -</div>
    </div>
  )
}

export default JobSummary
