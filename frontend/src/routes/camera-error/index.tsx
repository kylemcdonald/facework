import { useEffect } from "preact/hooks"
import { FunctionalComponent, h } from "preact"
import { route } from "preact-router"
import { useUserMedia } from "../../lib/use-user-media"
import { RetryLink } from "../../components/retry-link"
import { addMessage } from "../../lib/logging"
import { explainError } from "../../lib/explain-error"
import * as style from "./style.css"

const explanation = explainError()

const ErrorFound: FunctionalComponent<{ error: MediaStreamError }> = props => {
  useEffect(() => {
    addMessage("camera-error", { message: props.error.message })
  }, [])
  return (
    <div className={style.errorPage}>
      <h1>Oops!</h1>
      <img src="/assets/images/camera-icon.svg" height="100" />
      <div className={style.errorPageBody}>
        <p>Your camera is disabled.</p>
        <p>Don&apos;t miss out on all the good jobs!</p>
        <p>{explanation}</p>
        <p className={style.errorPageRaw}>Error: {props.error.message}</p>
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
    route("/choose")
    return null
  } else if (error !== null) {
    return <ErrorFound error={error} />
  } else {
    return <NothingFound />
  }
}

export default CameraError
