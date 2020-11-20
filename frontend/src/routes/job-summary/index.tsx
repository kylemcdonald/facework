import { FunctionalComponent, h } from "preact"
import { useState, useMemo, useCallback } from "preact/hooks"
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
import * as chooseStyle from "../choose-job/style.css"

import { JobSummaryConfig } from "../../lib/app-acts-config"
import { addMessage } from "../../lib/logging"
const {
  nextButton: { autoclickTimeout }
} = JobSummaryConfig

const JobSummary: FunctionalComponent = () => {
  const [showChat, setShowChat] = useState(false)
  const customerImagePath = useMemo(getCustomerImagePath, [])
  const actId = useTypedSelector(state => state.act)
  const completedJobs = useTypedSelector(state => state.completedJobs),
    // there should always be at least one job in this list
    lastJob = completedJobs[completedJobs.length - 1]
  const startingBalanceCents = getStartingBalance(completedJobs.slice(0, -1))
  const lastJobTip = toDollars(lastJob.tip),
    subscriptionCost = toDollars(getJobSubscriptionCost(lastJob)),
    grandTotal = toDollars(getJobGrandTotal(lastJob) + startingBalanceCents),
    startingBalance = toDollars(startingBalanceCents)
  useEffect(() => {
    addMessage("job", {
      name: lastJob.name,
      trait: lastJob.trait,
      highScore: lastJob.highScore
    })
  })
  const onClick = useCallback(
    () =>
      showChat || actId === firstActId ? onAdvance(actId) : setShowChat(true),
    []
  )

  return (
    <AtopVideoSelfie isBlurred={true} aboveHeader={showChat}>
      <div className={style.jobSummaryContainer}>
        {showChat && actId !== firstActId && (
          <ChatOverlay
            actId={actId}
            chatMessages={getChatMessagesforAct(actId, lastJob.highScore)}
            onAdvance={onAdvance}
          />
        )}
        <div class={style.jobSummaryBody}>
          <h1>Job Summary</h1>
          <div className={style.jobSummaryImageReview}>
            <img class={style.jobImage} src={customerImagePath} />
            <span className={style.jobReview}>
              &#8220;{`${lastJob.review}`}&#8221;
            </span>
          </div>
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
              <span>Facework Fee</span>
              <span>-{subscriptionCost}</span>
            </div>
          </div>
          <div className={style.jobSummaryLineItemsSeparator} />
          <div className={style.jobSummaryGrandTotalContainer}>
            <div className={style.jobSummaryLineItem}>
              <span className={style.jobSummaryGrandTotalHeader}>
                Grand Total
              </span>
              <span>{grandTotal}</span>
            </div>
          </div>
        </div>
        <div className={style.jobSummaryFooter}>
          <div className={style.jobSummaryFooterPadding}></div>
          <button
            className={`${chooseStyle.textButton} ${chooseStyle.textButtonWhite}`}
            type="button"
            onClick={onClick}
          >
            See all new jobs{" "}
            <img
              src="/assets/images/arrow.svg"
              height="15"
              style={{ verticalAlign: "middle" }}
            />
          </button>
          <div className={style.jobSummaryFooterPadding}></div>
        </div>
        <div className={showChat ? style.hidden : ""}>
          <AutoAdvanceButton
            label="Next"
            autoClickTimeout={autoclickTimeout}
            onClick={onClick}
          />
        </div>
      </div>
    </AtopVideoSelfie>
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
  if (actId !== finalActId) {
    route("/choose")
  } else {
    route("/epilogue")
  }
  store.dispatch(advanceAct())
}

function getCustomerImagePath(): string {
  const index = Math.floor(Math.random() * (77 + 1))
  return `/assets/images/customers/${index}.jpg`
}

export default JobSummary
