import { FunctionalComponent, h } from "preact"
import { useEffect } from "preact/hooks"
import * as style from "./style.css"
import VideoSelfie from "../../components/videoselfie"
import * as face from "../../lib/vision"

const Versus: FunctionalComponent = () => {
  useEffect(() => face.initialize)
  return (
    <div class={style.versus}>
      <h1>Versus</h1>
      <p>
        Get ready to <em>FACE OFF</em>.
      </p>
      <VideoSelfie onPlay={face.detect} />
    </div>
  )
}

export default Versus
