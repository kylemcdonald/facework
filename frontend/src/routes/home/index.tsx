import { FunctionalComponent, h } from "preact"
import * as style from "./style.css"
import { Link } from "preact-router"

const Home: FunctionalComponent = () => {
  return (
    <div class={style.home}>
      <h1>
        Welcome to <em>APP</em>
      </h1>
      <Link href="/act/choose/one">Start</Link>
    </div>
  )
}

export default Home
