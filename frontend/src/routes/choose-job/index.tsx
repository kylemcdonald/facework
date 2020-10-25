import { FunctionalComponent, h } from "preact"
import { ActsConfig } from "../../lib/app-acts-config"
import { route, Link } from "preact-router"
import AutoAdvanceButton from "../../components/auto-advance-button"
import { useTypedSelector, setCurrentJob, store } from "../../lib/store"
import VideoSelfie from "../../components/videoselfie"
import { PotentialJob } from "../../lib/job"

import { ChooseJobConfig } from "../../lib/app-acts-config"
const {
  nextButton: { autoclickTimeout }
} = ChooseJobConfig

const verusUrl = "/versus/"

interface JobListProps {
  readonly jobs: ReadonlyArray<PotentialJob>
}

const JobList: FunctionalComponent<JobListProps> = props => (
  <ul>
    {props.jobs.map(job => (
      <li key={job.name}>
        <Link
          onClick={() => {
            store.dispatch(setCurrentJob(job))
            route(verusUrl)
          }}
        >
          <span>
            <b>{job.name} </b>
          </span>
          <span>({job.trait})</span>
        </Link>
      </li>
    ))}
  </ul>
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
    <>
      <h2>New jobs!</h2>
      <JobList jobs={availableJobs} />
      <AutoAdvanceButton
        label="Next"
        autoClickTimeout={autoclickTimeout}
        onClick={() => {
          // set a random job from this act
          store.dispatch(
            setCurrentJob(
              availableJobs[
                Math.round(Math.random() * availableJobs.length - 1)
              ]
            )
          )
          // and start them on it
          route(verusUrl)
        }}
      />
      <VideoSelfie />
    </>
  )
}

export default ChooseJob
