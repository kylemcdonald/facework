import { FunctionalComponent, h } from "preact"
import { Link } from "preact-router"
import * as style from "./style.css"

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
      <Link href="/">Next</Link>
    </div>
  )
}

export default JobSummary
