import { FunctionalComponent, h } from "preact"
import { route } from "preact-router"
import AutoAdvanceButton from "../../components/auto-advance-button"
import * as style from "./style.css"
import { useCallback } from "preact/hooks"
import { advanceAct, store, useTypedSelector } from "../../lib/store"
import { actsPlan } from "../../lib/acts"

const ChatPage: FunctionalComponent = () => {
  const actId = useTypedSelector(state => state.act)
  const { chats } = actsPlan[actId]

  const onAdvance = useCallback(() => {
    store.dispatch(advanceAct())
    // TODO: be smarter here
    if (actId === "three" || actId === "final") {
      route("/epilogue")
    } else {
      route("/choose")
    }
  }, [])

  return (
    <div class={style.chatPage}>
      <h1>Chat</h1>
      <ol>
        {chats.map(chatMessage => (
          <li key={chatMessage}>{chatMessage}</li>
        ))}
      </ol>
      <AutoAdvanceButton label="Next" timeLimit={5000} onClick={onAdvance} />
    </div>
  )
}

export default ChatPage
