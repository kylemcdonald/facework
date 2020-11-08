import { FunctionalComponent, h } from "preact"
import { useRef, useEffect, useCallback } from "preact/hooks"
import { useUserMedia } from "../../lib/use-user-media"
import * as style from "./style.css"

function setSrc(
  video: HTMLVideoElement | null,
  stream: MediaStream | null
): void {
  if (video !== null) video.srcObject = stream
}

interface VideoSelfieProps {
  readonly onPlay?: (videoElement: HTMLVideoElement) => void
  /** defaults to false */
  readonly isBlurred: boolean
}

const VideoSelfie: FunctionalComponent<VideoSelfieProps> = (
  props: VideoSelfieProps
) => {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const { stream, error } = useUserMedia()
  useEffect(() => setSrc(videoRef.current, stream), [videoRef.current])
  const onPlayCallback = useCallback(() => {
    if (props.onPlay !== undefined && videoRef.current !== null) {
      props.onPlay(videoRef.current)
    }
  }, [props.onPlay, videoRef.current])

  return (
    <div
      class={
        style.wrapper + (props.isBlurred === true ? " " + style.blurred : "")
      }
    >
      <video
        autoPlay
        ref={videoRef}
        onPlay={onPlayCallback}
        class={style.self}
        playsInline={true}
      />
    </div>
  )
}

export const AtopVideoSelfie: FunctionalComponent<VideoSelfieProps> = props => (
  <>
    <div class={style.upperLayer}>{props.children}</div>
    <VideoSelfie key="selfie" {...props} />
  </>
)

export default VideoSelfie
