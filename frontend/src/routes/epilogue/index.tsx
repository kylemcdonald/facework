import { FunctionalComponent, h } from "preact"
import { useTypedSelector } from "../../lib/store"
import { getStartingBalance, toDollars } from "../../lib/job"
import * as style from "./style.css"
import { addMessage } from "../../lib/logging"

const Epilogue: FunctionalComponent = () => {
  addMessage("epilogue", {})
  const completedJobs = useTypedSelector(state => state.completedJobs)
  const grandTotal = getStartingBalance(completedJobs)

  return (
    <div className={`content ${style.appError}`}>
      <pre>
        {`
DUMP: ${completedJobs.length}X jobs. ${toDollars(grandTotal)}
total tips...

 _ _ _ _ _ _ _ _ _ _ _ _ _
|                         |
|  NETWORK NOT RESPONDING |
|_ _ _ _ _ _ _ _ _ _ _ _ _|

FACEWORK is built by:
Kyle
Evelyn
Greg
Sarah
Fei

funded by...
`}
      </pre>
    </div>
  )
}

export default Epilogue
