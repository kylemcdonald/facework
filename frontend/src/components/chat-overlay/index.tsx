import { FunctionalComponent, h } from "preact"
import AutoAdvanceButton from "../auto-advance-button"
import * as style from "./style.css"
import { useTypedSelector } from "../../lib/store"
import { getStartingBalance, toDollars } from "../../lib/job"
import { useState, useEffect } from "preact/hooks"
import { IntermediateAct, firstActId, ActId } from "../../lib/app-acts-config"

import { ChatPageConfig } from "../../lib/app-acts-config"
const {
  nextButton: { autoclickTimeout }
} = ChatPageConfig

function formatGrandTotal(chatMessage: string, grandTotal: string): string {
  return chatMessage.replace("{{grandTotal}}", grandTotal)
}

const ChatMessages: FunctionalComponent<{
  messages: ReadonlyArray<string>
}> = props => {
  const completedJobs = useTypedSelector(state => state.completedJobs)
  const grandTotal = toDollars(getStartingBalance(completedJobs))
  return (
    <ol className={style.chatMessageList}>
      {props.messages.map(chatMessage => (
        <li key={chatMessage} className={style.chatMessage}>
          {formatGrandTotal(chatMessage, grandTotal)}
        </li>
      ))}
    </ol>
  )
}

interface ChatOverlayProps {
  chatMessages: IntermediateAct["chats"]
  actId: Exclude<ActId, typeof firstActId>
  onAdvance: (actId: ActId) => void
}

const ChatOverlay: FunctionalComponent<ChatOverlayProps> = props => {
  const { chatMessages, actId, onAdvance } = props
  const [chatMessageRenderCount, setchatMessageRenderCount] = useState(0)
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>
    const update = (): void => {
      // in case this is called by the click handler
      clearTimeout(timeoutId)
      // bump up count to display next chat message
      setchatMessageRenderCount(prev => {
        if (prev === chatMessages.length) {
          return prev
        }
        const nextMessage =
          chatMessages[Math.min(prev + 1, chatMessages.length - 1)]
        timeoutId = setTimeout(update, getTimeoutLength(nextMessage))
        return prev + 1
      })
    }
    update()
    window.addEventListener("pointerup", update)
    return () => {
      window.removeEventListener("pointerup", update)
      clearTimeout(timeoutId)
    }
  }, [])

  return (
    <div class={`content ${style.chatPage}`}>
      <ChatMessages messages={chatMessages.slice(0, chatMessageRenderCount)} />
      {chatMessageRenderCount === chatMessages.length ? (
        <AutoAdvanceButton
          label="Next"
          autoClickTimeout={autoclickTimeout}
          onClick={(): void => onAdvance(actId)}
        />
      ) : null}
      <video class={style.videoBackground} autoPlay muted playsInline loop>
        <source src="/assets/images/bg-15-15-gray-480p.mp4" type="video/mp4" />
      </video>
    </div>
  )
}

function getTimeoutLength(chatMessage: string): number {
  return 500 + chatMessage.split(" ").length * 400
}

export default ChatOverlay
