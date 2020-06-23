import { FunctionalComponent, h } from "preact"
import * as style from "./style.css"
import VideoSelfie from "../../components/videoselfie"

const Versus: FunctionalComponent = () => {
  return (
    <div class={style.versus}>
      <h1>Versus</h1>
      <p>
        Get ready to <em>FACE OFF</em>.
      </p>
      <VideoSelfie />
    </div>
  )
}

export default Versus
