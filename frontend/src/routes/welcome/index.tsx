import { FunctionalComponent, h } from "preact"
import * as style from "./style.css"
import { Link } from "preact-router"
import { useUserMedia } from "../../lib/use-user-media"

const Welcome: FunctionalComponent = () => {
  const { error } = useUserMedia()
  return (
    <div class={style.home}>
      <h1>
        Welcome to <em>APP</em>
      </h1>
      <Link href={error === null ? "/choose" : "/error"}>Start</Link>
    </div>
  )
}

export default Welcome
