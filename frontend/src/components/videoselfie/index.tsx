import { FunctionalComponent, h } from "preact"
import { useUserMedia } from "./helpers"
import * as style from "./style.css"

function setSrc(
  video: HTMLVideoElement | null,
  stream: MediaStream | null
): void {
  if (video !== null) video.srcObject = stream
}

interface VideoSelfieProps {
  onPlay?: () => void
}

const VideoSelfie: FunctionalComponent<VideoSelfieProps> = (
  props: VideoSelfieProps
) => {
  const { stream, error } = useUserMedia()

  return (
    <div class={style.container}>
      <video
        autoPlay
        ref={video => void setSrc(video, stream)}
        onPlay={props.onPlay}
      />
    </div>
  )
}

export default VideoSelfie
