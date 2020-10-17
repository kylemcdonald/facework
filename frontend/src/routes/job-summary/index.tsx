import { FunctionalComponent, h } from "preact"
import { route } from "preact-router"
import AutoAdvanceButton from "../../components/auto-advance-button"
import * as style from "./style.css"

import { JobSummaryConfig } from "../../lib/app-acts-config"
const {
  nextButton: { autoclickTimeout }
} = JobSummaryConfig

const JobSummary: FunctionalComponent = () => {
  return (
    <div class={style.jobSummaryPage}>
      <h1>Job Summary</h1>
      <table>
        <tr>
          <td>Job Price</td>
          <td>$5</td>
        </tr>
        <tr>
          <td>APP service charge</td>
          <td>$7</td>
        </tr>
        <tr>
          <td>Your Earnings</td>
          <td>-$2</td>
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
