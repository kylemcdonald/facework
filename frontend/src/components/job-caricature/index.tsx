import { FunctionalComponent, h } from "preact"
import { getJobCaricaturePath, BaseJob } from "../../lib/job"
import * as style from "./style.css"

interface JobCaricatureProps {
  readonly job: BaseJob
  readonly hoverable: boolean
  readonly size?: "regular" | "small"
}

const JobCaricature: FunctionalComponent<JobCaricatureProps> = props => (
  <img
    className={
      (props.size === "small" ? style.sizeSmall : style.sizeRegular) +
      " " +
      style.jobImage +
      (props.hoverable ? " " + style.jobHoverable : "")
    }
    src={getJobCaricaturePath(props.job)}
  ></img>
)

export default JobCaricature
