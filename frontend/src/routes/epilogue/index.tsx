import { FunctionalComponent, h } from "preact"
import * as style from "./style.css"
import { addMessage } from "../../lib/logging"

const Epilogue: FunctionalComponent = () => {
  addMessage("epilogue", {})
  return (
    <div className={`content ${style.appError}`}>
      <pre>
        {`
DUMP: 10X jobs. $5.21
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
