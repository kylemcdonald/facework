import { FunctionalComponent, h } from "preact"
import { ActsConfig } from "../../lib/app-acts-config"
import { route, Link } from "preact-router"
import AutoAdvanceButton from "../../components/auto-advance-button"
import { AtopVideoSelfie } from "../../components/videoselfie"
import { useTypedSelector, setCurrentJob, store } from "../../lib/store"
import { toDollars, PotentialJob, getJobCaricaturePath } from "../../lib/job"
import * as style from "./style.css"

import { ChooseJobConfig } from "../../lib/app-acts-config"
import JobCaricature from "../../components/job-caricature"
const {
  nextButton: { autoclickTimeout }
} = ChooseJobConfig

const verusUrl = "/versus/"

interface JobListProps {
  readonly jobs: ReadonlyArray<PotentialJob>
}

const JobList: FunctionalComponent<JobListProps> = props => (
  <div className={style.chooseJobContainer}>
    <div className={style.grandTotal}>
      <span>Grand Total</span>
      <span className={style.grandTotalAmount}>$0.00</span>
    </div>
    <div className={`content ${style.content}`}>
      <div>
        <h2>Get started with your first job</h2>
        <ul className={style.jobList}>
          {props.jobs.map(job => (
            <li key={job.name} className={style.job}>
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
                      Earn {toDollars(job.maxTip)}
                    </div>
                  </div>
                </div>
                <div>{job.name}</div>
                <span className={style.jobTrait}>{job.trait}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
)

const ChooseJob: FunctionalComponent = () => {
  const actId = useTypedSelector(state => state.act)
  const { availableJobs } = ActsConfig[actId]

  // if no choices are specified in our scene config,
  // just take user to the versus url
  if (availableJobs === undefined) {
    route(verusUrl)
    return <div>redirecting...</div>
  }
  return (
    <AtopVideoSelfie isBlurred={true}>
      <JobList jobs={availableJobs} />
      <AutoAdvanceButton
        label="Next"
        autoClickTimeout={autoclickTimeout}
        onClick={() => {
          // set a random job from this act
          // store.dispatch(
          //   setCurrentJob(
          //     availableJobs[Math.floor(Math.random() * availableJobs.length)]
          //   )
          // )
          // // and start them on it
          // route(verusUrl)
        }}
      />
    </AtopVideoSelfie>
  )
}

export default ChooseJob
