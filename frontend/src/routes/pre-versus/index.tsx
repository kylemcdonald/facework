import { FunctionalComponent, h } from "preact"
import { useEffect, useState, useCallback } from "preact/hooks"
import * as face from "../../lib/face-reader"
import * as style from "./style.css"
import VideoSelfie from "../../components/videoselfie"

const PreVersus: FunctionalComponent = () => {
  useEffect(() => {
    face.initialize()
  }, [])
  const [ready, setReady] = useState<boolean>(false)
  return (
    <div class={style.versus}>
      <h1>Versus</h1>
      <p>
        Get ready to <em>FACE OFF</em>.
      </p>
      <section>
        <VideoSelfie key="selfie" onPlay={() => setReady(true)} />
        <a href="/versus">
          <button disabled={!ready}>Let's gooo!</button>
        </a>
      </section>
    </div>
  )
}

export default PreVersus
