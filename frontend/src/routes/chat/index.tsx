import { FunctionalComponent, h } from "preact"
import { route } from "preact-router"
import AutoAdvanceButton from "../../components/auto-advance-button"
import * as style from "./style.css"
import { useCallback, useState, useEffect } from "preact/hooks"
import { advanceAct, store, useTypedSelector } from "../../lib/store"
import { ActsConfig } from "../../lib/app-acts-config"

import { ChatPageConfig } from "../../lib/app-acts-config"
const {
  nextButton: { autoclickTimeout },
  messageAppearanceInterval
} = ChatPageConfig

const ChatMessages: FunctionalComponent<{
  messages: ReadonlyArray<string>
}> = props => (
  <ol className={style.chatMessageList}>
    {props.messages.map(chatMessage => (
      <li key={chatMessage} className={style.chatMessage}>
        {chatMessage}
      </li>
    ))}
  </ol>
)

const ChatPage: FunctionalComponent = () => {
  const actId = useTypedSelector(state => state.act)
  const { chats } = ActsConfig[actId]

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
    }, messageAppearanceInterval)
  }, [])

  return (
    <div class={`content ${style.chatPage}`}>
      <ChatMessages messages={chats.slice(0, chatMessageRenderCount)} />
      {chatMessageRenderCount === chats.length ? (
        <AutoAdvanceButton
          label="Next"
          autoClickTimeout={autoclickTimeout}
          onClick={onAdvance}
        />
      ) : null}
    </div>
  )
}

export default ChatPage
