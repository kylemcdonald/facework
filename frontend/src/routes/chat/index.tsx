import { FunctionalComponent, h } from "preact"
import { route } from "preact-router"
import AutoAdvanceButton from "../../components/auto-advance-button"
import * as style from "./style.css"
import { useCallback, useState, useEffect } from "preact/hooks"
import { advanceAct, store, useTypedSelector } from "../../lib/store"
import { actsPlan } from "../../lib/acts"

const ChatMessages: FunctionalComponent<{
  messages: ReadonlyArray<string>
}> = props => (
  <ol>
    {props.messages.map(chatMessage => (
      <li key={chatMessage}>{chatMessage}</li>
    ))}
  </ol>
)

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

  const [chatMessageRenderCount, setchatMessageRenderCount] = useState(1)
  useEffect(() => {
    const intervalID = setInterval(() => {
      setchatMessageRenderCount(prev => {
        if (prev === chats.length) {
          clearInterval(intervalID)
          return prev
        }
        return prev + 1
      })
    }, 1000)
  }, [])

  return (
    <div class={style.chatPage}>
      <h1>Chat</h1>
      <ChatMessages messages={chats.slice(0, chatMessageRenderCount)} />
      {chatMessageRenderCount === chats.length ? (
        <AutoAdvanceButton label="Next" timeLimit={5000} onClick={onAdvance} />
      ) : null}
    </div>
  )
}

export default ChatPage
