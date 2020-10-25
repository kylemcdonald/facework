import { FunctionalComponent, h } from "preact"
import { route } from "preact-router"
import AutoAdvanceButton from "../../components/auto-advance-button"
import { useTypedSelector } from "../../lib/store"
import { getReview, getTip, toDollars } from "../../lib/job"
import * as style from "./style.css"

import { JobSummaryConfig } from "../../lib/app-acts-config"
const {
  nextButton: { autoclickTimeout }
} = JobSummaryConfig

const JobSummary: FunctionalComponent = () => {
  const completedJobs = useTypedSelector(state => state.completedJobs)
  const lastJob = completedJobs[completedJobs.length - 1]
  return (
    <div class={style.jobSummaryPage}>
      <h1>Job Summary</h1>
      <p>{`"${lastJob.review}" — Your customer`}</p>
      <table>
        <tr>
          <td>{lastJob.name}</td>
          <td>{toDollars(lastJob.basePay)}</td>
        </tr>
        <tr>
          <td>Customer Tip</td>
          <td>{toDollars(lastJob.tip)}</td>
        </tr>
        <tr>
          <td>APP subscription</td>
          <td>{toDollars(lastJob.basePay + lastJob.tip)}</td>
        </tr>
        <tr>
          <td>Grand Total</td>
          <td>$0</td>
        </tr>
      </table>
      <AutoAdvanceButton
        label="Next"
        autoClickTimeout={autoclickTimeout}
        onClick={() => route("/chat")}
      />
    </div>
  )
}

export default JobSummary
