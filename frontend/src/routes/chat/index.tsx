import { FunctionalComponent, h } from "preact"
import AutoAdvanceButton from "../../components/auto-advance-button"
import * as style from "./style.css"
import { useState, useEffect } from "preact/hooks"
import { IntermediateAct, firstActId, ActId } from "../../lib/app-acts-config"
import { onAdvance } from "../job-summary"

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

interface ChatProps {
  chatMessages: IntermediateAct["chats"]
  actId: Exclude<ActId, typeof firstActId>
}

const Chat: FunctionalComponent<ChatProps> = props => {
  const { chatMessages: chats, actId } = props
  const [chatMessageRenderCount, setchatMessageRenderCount] = useState(1)
  useEffect(() => {
    const intervalID = setInterval(() => {
      setchatMessageRenderCount(prev => {
        if (prev === props.chatMessages.length) {
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
          onClick={() => onAdvance(actId)}
        />
      ) : null}
    </div>
  )
}

export default Chat
