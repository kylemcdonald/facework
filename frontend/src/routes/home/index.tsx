import { FunctionalComponent, h } from "preact"
import * as style from "./style.css"
import { Link } from "preact-router"

const Home: FunctionalComponent = () => {
  return (
    <div class={style.home}>
      <h1>
        Can you beat <em>Most Face Ever</em>
      </h1>
      <Link href="/versus">Start Battle</Link>
    </div>
  )
}

export default Home
