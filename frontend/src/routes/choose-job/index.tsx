import { FunctionalComponent, h } from "preact"
import { ActsConfig } from "../../lib/app-acts-config"
import { route, Link } from "preact-router"
import { TraitLabel } from "../../lib/face-reader-labels"
import AutoAdvanceButton from "../../components/auto-advance-button"
import { useTypedSelector } from "../../lib/store"
import VideoSelfie from "../../components/videoselfie"

import { ChooseJobConfig } from "../../lib/app-acts-config"

const {
  nextButton: { autoclickTimeout }
} = ChooseJobConfig

const verusUrl = "/versus/"

interface ChooseTraitProps {
  readonly traits: ReadonlyArray<TraitLabel>
}

const ChooseTrait: FunctionalComponent<ChooseTraitProps> = props => (
  <div>
    <h2>New jobs!</h2>
    <ul>
      {props.traits.map(trait => (
        <li key={trait}>
          <Link href={verusUrl}>{trait}</Link>
        </li>
      ))}
    </ul>
    <AutoAdvanceButton
      label="Next"
      autoClickTimeout={autoclickTimeout}
      onClick={() => route(verusUrl)}
    />
    <VideoSelfie />
  </div>
)

const ChooseJob: FunctionalComponent = () => {
  const actId = useTypedSelector(state => state.act)
  const { opponents } = ActsConfig[actId]

  // if no choices are specified in our scene config,
  // just take user to the versus url
  if (opponents === undefined) {
    route(verusUrl)
    return <div>redirecting...</div>
  }
  return <ChooseTrait traits={opponents} />
}

export default ChooseJob
