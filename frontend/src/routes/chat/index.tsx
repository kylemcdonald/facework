import { FunctionalComponent, h } from "preact"
import { Link } from "preact-router"
import * as style from "./style.css"

const ChatPage: FunctionalComponent = () => {
  return (
    <div class={style.chatPage}>
      <h1>Chat</h1>
      <ol>
        <li>Hey, I see you there</li>
        <li>Don&apos;t bother trying to chat. I disabled it.</li>
        <li>Get ready for the next round. We have a better one for you.</li>
      </ol>
      <Link href="/">Next</Link>
    </div>
  )
}

export default ChatPage
