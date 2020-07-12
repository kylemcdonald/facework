import { FunctionalComponent, h } from "preact"
import { useRef, useEffect, useCallback } from "preact/hooks"
import { useUserMedia } from "./helpers"
import * as style from "./style.css"

function setSrc(
  video: HTMLVideoElement | null,
  stream: MediaStream | null
): void {
  if (video !== null) video.srcObject = stream
}

interface VideoSelfieProps {
  onPlay?: (videoElement: HTMLVideoElement) => void
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
    <video autoPlay ref={videoRef} onPlay={onPlayCallback} class={style.self} />
  )
}

export default VideoSelfie
