import { FunctionalComponent, h } from "preact"
import { Link } from "preact-router/match"
import AutoAdvanceButton from "../../components/auto-advance-button"

const AutoAdvanceExample: FunctionalComponent = () => {
  return (
    <div>
      <h1>AutoAdvanceButton</h1>
      <AutoAdvanceButton timeLimit={5000} onClick={(): void => alert("bang")} />
      <Link href="/">
        <h4>Back to Home</h4>
      </Link>
    </div>
  )
}

export default AutoAdvanceExample
