import { FunctionalComponent, h } from "preact"
import { StateUpdater, useState } from "preact/hooks"
import { ActsConfig } from "../../lib/app-acts-config"
import { route, Link } from "preact-router"
import AutoAdvanceButton from "../../components/auto-advance-button"
import { AtopVideoSelfie } from "../../components/videoselfie"
import { useTypedSelector, setCurrentJob, store } from "../../lib/store"
import {
  toDollars,
  PotentialJob,
  getStartingBalance,
  CompletedJob
} from "../../lib/job"
import JobCaricature from "../../components/job-caricature"
import * as style from "./style.css"

import { ActId, ChooseJobConfig } from "../../lib/app-acts-config"
const {
  nextButton: { autoclickTimeout }
} = ChooseJobConfig

const verusUrl = "/versus/"

interface JobListProps {
  readonly jobs: ReadonlyArray<PotentialJob>
  /** Amount in cents ($2.50 is 250) */
  readonly grandTotal: number
  readonly actId: ActId
  readonly completedJobs: ReadonlyArray<CompletedJob>
  readonly showCompletedJobs: boolean
  readonly setShowCompletedJobs: StateUpdater<boolean>
}

const JobList: FunctionalComponent<JobListProps> = props => {
  const { showCompletedJobs, setShowCompletedJobs, completedJobs } = props

  return(
    <div className={style.chooseJobContainer}>
      <div className={style.completedJobsContainer}>
        <div
          className={`${style.completedJobs} ${
            showCompletedJobs ? style.visible : ""
          }`}
        >
          <div>
            <h1>Job Summary</h1>
            {completedJobs.map(cj => (
              <div
                className={style.jobSummaryLineItem}
                key={`${cj.name} ${cj.tip}`}
              >
                <span>{cj.name}</span>
                <span>{toDollars(cj.tip)}</span>
              </div>
            ))}
          </div>
          <div className={style.jobSummaryLineItemsSeparator} />
        </div>
        <button
          className={`${style.textButton} ${
            showCompletedJobs ? style.fade : ""
          }`}
          type="button"
          onClick={() => {
            setShowCompletedJobs(true)
          }}
        >
          See all completed jobs
        </button>
        <div className={style.grandTotal}>
          <span>Grand Total</span>
          <span>{toDollars(props.grandTotal)}</span>
        </div>
      </div>
      <div
        className={`content ${style.content} ${
          showCompletedJobs ? style.fade : ""
        }`}
      >
        <div>
          {props.actId == "one" && (
            <h2 className={style.header}>Get started with your first job</h2>
          )}
          <ul className={style.jobList}>
            {props.jobs.map(job => (
              <li key={`${job.name} ${job.trait}`} className={style.job}>
                <Link
                  onClick={() => {
                    store.dispatch(setCurrentJob(job))
                    route(verusUrl)
                  }}
                >
                  <div className={style.jobImageContainer}>
                    <JobCaricature job={job} hoverable={true} />
                    <div className={style.jobEarningsContainer}>
                      <div className={style.jobEarnings}>
                        Earn {toDollars(job.maxTip, true)}
                      </div>
                    </div>
                  </div>
                  <div className={style.jobName}>{job.name}</div>
                  <span className={style.jobTrait}>{job.trait}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div
        className={`content ${style.content} ${style.seeAll} ${
          showCompletedJobs ? "" : style.fade
        }`}
      >
        <button
          className={`${style.textButton} ${style.textButtonWhite}`}
          type="button"
          onClick={() => {
            setShowCompletedJobs(false)
          }}
        >
          See all new jobs{" "}
          <img
            src="/assets/images/arrow.svg"
            height="15"
            style={{ verticalAlign: "middle" }}
          />
        </button>
      </div>
    </div>
  )
}

const ChooseJob: FunctionalComponent = () => {
  const actId = useTypedSelector(state => state.act)
  const [showCompletedJobs, setShowCompletedJobs] = useState(false)
  const { availableJobs } = ActsConfig[actId]

  // if no choices are specified in our scene config,
  // just take user to the versus url
  if (availableJobs === undefined) {
    route(verusUrl)
    return <div>redirecting...</div>
  }

  const completedJobs = useTypedSelector(state => state.completedJobs)
  const grandTotal = getStartingBalance(completedJobs)

  return (
    <AtopVideoSelfie isBlurred={true}>
      <JobList
        jobs={availableJobs}
        grandTotal={grandTotal}
        actId={actId}
        completedJobs={completedJobs}
        showCompletedJobs={showCompletedJobs}
        setShowCompletedJobs={setShowCompletedJobs}
      />
      <AutoAdvanceButton
        label="Next"
        autoClickTimeout={autoclickTimeout}
        onClick={() => {
          // TODO: stop the timer when user views job history
          // set a random job from this act
          store.dispatch(
            setCurrentJob(
              availableJobs[Math.floor(Math.random() * availableJobs.length)]
            )
          )
          // and start them on it
          route(verusUrl)
        }}
      />
    </AtopVideoSelfie>
  )
}

export default ChooseJob
