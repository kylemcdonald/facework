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
   _                          
 _|_ _.  _  _        _  ._ |  
  | (_| (_ (/_ \\/\\/ (_) |  |< 
  __________________________
 |                          |
 |  NETWORK NOT RESPONDING  |
 *==========================*

Built with love by Kyle, Evelyn, Greg, Sarah and Fei.

Supported by Mozilla Creative Media Awards.
`}
      </pre>
    </div>
  )
}

export default Epilogue
