import { FunctionalComponent, h } from "preact"
import * as style from "./style.css"
import { Link } from "preact-router"

const Home: FunctionalComponent = () => {
  return (
    <div class={style.home}>
      <h1>
        Can you beat the <em>Most Face Ever</em>??
      </h1>
      <Link href="/act/one">Start</Link>
    </div>
  )
}

export default Home
