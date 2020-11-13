import { FunctionalComponent, h } from "preact"
import * as style from "./style.css"
import { Link, route } from "preact-router"
import { useUserMedia } from "../../lib/use-user-media"
import { useState } from "preact/hooks"

const GetStartedLink: FunctionalComponent = () => {
  const [getStartedClicked, setGetStartedClicked] = useState(false)
  if (getStartedClicked) {
    const { stream, error } = useUserMedia()
    // if we have a stream OR an error returned, route user to the appropriate page
    if (stream !== null || error !== null) {
      const routeUrl = stream !== null ? "/choose" : "/error"
      route(routeUrl)
    }
  }
  return (
    <div className={style.getStarted}>
      <Link
        disabled={getStartedClicked}
        onClick={(): void => setGetStartedClicked(true)}
      >
        {getStartedClicked ? (
          "Loading..."
        ) : (
          <span>
            Let&apos;s get started{" "}
            <img src="/assets/images/arrow.svg" height="15" />
          </span>
        )}
      </Link>
    </div>
  )
}

const Welcome: FunctionalComponent = () => {
  return (
    <div className={style.home}>
      <div>Welcome to</div>
      <div className={style.heroText}></div>
      <GetStartedLink />
    </div>
  )
}

export default Welcome
