import { FunctionalComponent, h } from "preact"
import { Link } from "preact-router"
import { useUserMedia } from "../../lib/use-user-media"
import VideoSelfie from "../../components/videoselfie"
import { ReloadLink } from "../../components/reload-link"

const StreamFound: FunctionalComponent = () => (
  <div>
    <p>If you can see your video below this, you are ready to start.</p>
    <Link href="/choose">Start</Link>
    <VideoSelfie />
  </div>
)

const ErrorFound: FunctionalComponent<{ error: MediaStreamError }> = props => (
  <div>
    <p>Error: {props.error.message}</p>
    <ReloadLink />
  </div>
)

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
