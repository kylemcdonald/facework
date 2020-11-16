import { FunctionalComponent, h } from "preact"
import * as style from "./style.css"
import { Link, route } from "preact-router"
import { useUserMedia } from "../../lib/use-user-media"
import { useState } from "preact/hooks"
import { addMessage } from "../../lib/logging"

const GetStartedLink: FunctionalComponent = () => {
  const [getStartedClicked, setGetStartedClicked] = useState(false)
  if (getStartedClicked) {
    const { stream, error } = useUserMedia()
    if (stream != null) {
      const settings = stream.getVideoTracks()?.[0]?.getSettings()
      addMessage("camera-success", {
        width: settings?.width,
        height: settings?.height,
        frameRate: settings?.frameRate
      })
    }
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
      <div className={style.introText}>
        When new jobs arrive our AI will give you an audition to see if your
        face fits. We know you&apos;ll do whatever it takes to make yourself a
        good match for every job. <em>All video stays on your device.</em>
      </div>
      <GetStartedLink />
    </div>
  )
}

export default Welcome
