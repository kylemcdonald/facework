import { FunctionalComponent, h } from "preact"
import { Link } from "preact-router"

const Epilogue: FunctionalComponent = () => {
  return (
    <div>
      <h2>ERR_APP_CRASH</h2>
      <pre>
        {`
{
  "gameState": "over",
  "game credits": {
    "creator": [
        "kyle mcdonald",
        "evelyn masso",
        "fei liu",
        "greg borenstein"
      ]
  }
}`}
      </pre>
      <p>
        <em>The End.</em>
      </p>
      <p>
        <Link href="/">Go Home</Link>
      </p>
    </div>
  )
}

export default Epilogue
