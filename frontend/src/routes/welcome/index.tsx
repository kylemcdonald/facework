import { FunctionalComponent, h } from "preact"
import * as style from "./style.css"
import { Link } from "preact-router"
import { useUserMedia } from "../../lib/use-user-media"

const Welcome: FunctionalComponent = () => {
  const { error } = useUserMedia()
  return (
    <div className={style.home}>
      <div>Welcome to</div>
      <div className={style.heroText}>
        <div>face</div>
        <div>work</div>
      </div>
      <div className={style.getStarted}>
        <Link href={error === null ? "/choose" : "/error"}>
          Let&apos;s get started
        </Link>
      </div>
    </div>
  )
}

export default Welcome
