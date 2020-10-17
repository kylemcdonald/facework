import { FunctionalComponent, h } from "preact"
import * as style from "./style.css"
import { Link } from "preact-router"

const Welcome: FunctionalComponent = () => {
  return (
    <div class={style.home}>
      <h1>
        Welcome to <em>APP</em>
      </h1>
      <Link href="/choose">Start</Link>
    </div>
  )
}

export default Welcome
