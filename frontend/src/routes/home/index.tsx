import { FunctionalComponent, h } from "preact"
import * as style from "./style.css"
import { Link } from "preact-router"

const Home: FunctionalComponent = () => {
  return (
    <div class={style.home}>
      <h1>
        Get ready to be the <em>Most Face Ever</em>
      </h1>
      <Link href="/versus">Start</Link>
    </div>
  )
}

export default Home
