import { FunctionalComponent, h } from "preact"
import { route } from "preact-router"
import AutoAdvanceButton from "../../components/auto-advance-button"
import * as style from "./style.css"

const ChatPage: FunctionalComponent = () => {
  return (
    <div class={style.chatPage}>
      <h1>Chat</h1>
      <ol>
        <li>Hey, I see you there</li>
        <li>Don&apos;t bother trying to chat. I disabled it.</li>
        <li>Get ready for the next job. We have a better one for you.</li>
      </ol>
      <AutoAdvanceButton
        label="Next"
        timeLimit={5000}
        onClick={() => route("/act/choose/one")}
      ></AutoAdvanceButton>
    </div>
  )
}

export default ChatPage
