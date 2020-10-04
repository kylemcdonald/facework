import { FunctionalComponent, h } from "preact"
import { Link } from "preact-router"

const Epilogue: FunctionalComponent = () => {
  return (
    <div>
      <p>ERR_APP_CRASH</p>
      <p>
        {`{
          "gameState": "over",
          "game credits": {
            "creator": ["kyle mcdonald", "evelyn masso", "fei liu", "greg borenstein"]
          }
          }`}
      </p>
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
