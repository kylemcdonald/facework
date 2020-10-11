import { FunctionalComponent, h } from "preact"
import { actsPlan } from "../../lib/acts"
import { route, Link } from "preact-router"
import { TraitLabel } from "../../lib/face-reader-labels"
import AutoAdvanceButton from "../../components/auto-advance-button"
import { useTypedSelector } from "../../lib/store"

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
      timeLimit={4000}
      onClick={() => route(verusUrl)}
    />
  </div>
)

const Choose: FunctionalComponent = () => {
  const actId = useTypedSelector(state => state.act)
  const { opponents } = actsPlan[actId]

  // if no choices are specified in our scene config,
  // just take user to the versus url
  if (opponents === undefined) {
    route(verusUrl)
    return <div>redirecting...</div>
  }
  return <ChooseTrait traits={opponents} />
}

export default Choose
