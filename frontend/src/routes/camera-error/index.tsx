import { useEffect } from "preact/hooks"
import { FunctionalComponent, h } from "preact"
import { Link } from "preact-router"
import { useUserMedia } from "../../lib/use-user-media"
import VideoSelfie from "../../components/videoselfie"
import { ReloadLink } from "../../components/reload-link"
import { addMessage } from "../../lib/logging"

const StreamFound: FunctionalComponent = () => (
  <div>
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
    <div>
      <p>Error: {props.error.message}</p>
      <ReloadLink />
    </div>
  )
}

const NothingFound: FunctionalComponent = () => (
  <div>
    <p>{`Your device's camera isn't working, but we're not sure why.`}</p>
    <ReloadLink />
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
