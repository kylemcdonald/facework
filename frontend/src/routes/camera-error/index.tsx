import { useEffect } from "preact/hooks"
import { FunctionalComponent, h } from "preact"
import { Link } from "preact-router"
import { useUserMedia } from "../../lib/use-user-media"
import VideoSelfie from "../../components/videoselfie"
import { RetryLink } from "../../components/retry-link"
import { addMessage } from "../../lib/logging"
import * as style from "./style.css"

const StreamFound: FunctionalComponent = () => (
  <div className={style.errorPage}>
    <p>If you can see your video below this, you are ready to start.</p>
    <Link href="/choose">Start</Link>
    <VideoSelfie isBlurred={false} />
  </div>
)

const ErrorFound: FunctionalComponent<{ error: MediaStreamError }> = props => {
  useEffect(() => {
    addMessage("camera-error", { message: props.error.message })
  }, [])
  return (
    <div className={style.errorPage}>
      <h1>Oops!</h1>
      <h1>
        <img src="/assets/images/camera-icon.svg" height="100" />
      </h1>
      <div className={style.errorPageBody}>
        <p>Your camera is disabled.</p>
        <p>Don&apos;t miss out on all the good jobs!</p>
        <p>Error: {props.error.message}</p>
      </div>
      <RetryLink />
    </div>
  )
}

const NothingFound: FunctionalComponent = () => (
  <div className={style.errorPage}>
    <h1>Oops!</h1>
    <h1>
      <img src="/assets/images/camera-icon.svg" height="100" />
    </h1>
    <div className={style.errorPageBody}>
      <p>{`Your device's camera isn't working, but we're not sure why.`}</p>
    </div>
    <RetryLink />
  </div>
)

const CameraError: FunctionalComponent = () => {
  const { stream, error } = useUserMedia()
  if (stream !== null) {
    return <StreamFound />
  } else if (error !== null) {
    return <ErrorFound error={error} />
  } else {
    return <NothingFound />
  }
}

export default CameraError
