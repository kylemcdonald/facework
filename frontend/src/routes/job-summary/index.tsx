import { FunctionalComponent, h } from "preact"
import { useState } from "preact/hooks"
import { route } from "preact-router"
import { AtopVideoSelfie } from "../../components/videoselfie"
import AutoAdvanceButton from "../../components/auto-advance-button"
import { useTypedSelector, store, advanceAct } from "../../lib/store"
import ChatOverlay from "../../components/chat-overlay"
import {
  ActId,
  isIntermediateAct,
  ActsConfig,
  IntermediateAct,
  firstActId,
  finalActId
} from "../../lib/app-acts-config"
import {
  toDollars,
  getJobSubscriptionCost,
  getJobGrandTotal,
  getStartingBalance
} from "../../lib/job"
import * as style from "./style.css"

import { JobSummaryConfig } from "../../lib/app-acts-config"
const {
  nextButton: { autoclickTimeout }
} = JobSummaryConfig

const JobSummary: FunctionalComponent = () => {
  const [showChat, setShowChat] = useState(false)
  const actId = useTypedSelector(state => state.act)
  const completedJobs = useTypedSelector(state => state.completedJobs),
    lastJob = completedJobs[completedJobs.length - 1]
  const lastJobTip = toDollars(lastJob.tip),
    subscriptionCost = toDollars(getJobSubscriptionCost(lastJob)),
    grandTotal = toDollars(getJobGrandTotal(lastJob)),
    startingBalance = toDollars(getStartingBalance(completedJobs.slice(0, -1)))
  return (
    <div>
      {showChat && actId !== firstActId && (
        <ChatOverlay
          actId={actId}
          chatMessages={getChatMessagesforAct(actId, lastJob.highScore)}
          onAdvance={onAdvance}
        />
      )}
      <AtopVideoSelfie isBlurred={true}>
        <div class={style.jobSummaryBody}>
          <h1>Job Summary</h1>
          <div>
            <div className={style.jobSummaryLineItem}>
              <span>Starting Balance</span>
              <span>{startingBalance}</span>
            </div>
            <div className={style.jobSummaryLineItem}>
              <span>Customer Tip</span>
              <span>{lastJobTip}</span>
            </div>
            <div className={style.jobSummaryLineItem}>
              <span>APP Subscription</span>
              <span>{subscriptionCost}</span>
            </div>
          </div>
          <div className={style.jobSummaryLineItemsSeparator} />
          <div className={style.jobSummaryGrandTotalContainer}>
            <div className={style.jobSummaryLineItem}>
              <span className={style.jobSummaryGrandTotalHeader}>
                Grand Total
              </span>
              <span className={style.jobSummaryGrandTotal}>{grandTotal}</span>
            </div>
          </div>
          <AutoAdvanceButton
            label="Next"
            autoClickTimeout={autoclickTimeout}
            onClick={() =>
              showChat || actId === firstActId
                ? onAdvance(actId)
                : setShowChat(true)
            }
          />
        </div>
      </AtopVideoSelfie>
      <div className={style.jobSummaryFooter}>See all new jobs</div>
    </div>
  )
}

function getChatMessagesforAct(
  actId: Exclude<ActId, typeof firstActId>,
  lastJobScore: number
): IntermediateAct["chats"] {
  return isIntermediateAct(actId)
    ? ActsConfig[actId].chats
    : lastJobScore >= ActsConfig[actId].winLoseThreshold
    ? ActsConfig[actId].winChats
    : ActsConfig[actId].loseChats
}

export function onAdvance(actId: ActId): void {
  store.dispatch(advanceAct())
  // TODO: be smarter here?
  if (actId === finalActId || ActsConfig[actId].next === finalActId) {
    route("/epilogue")
  } else {
    route("/choose")
  }
}

export default JobSummary
