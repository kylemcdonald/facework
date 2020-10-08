import { FunctionalComponent, h } from "preact"
import ActSceneIndex, { isActId, ActId } from "../../lib/acts"
import { route, Link } from "preact-router"
import { TraitLabel } from "../../lib/face-reader-labels"
import AutoAdvanceButton from "../../components/auto-advance-button"

const verusUrl = (trait?: TraitLabel): string =>
  ["/act/versus/", trait ?? ""].join()

interface ChooseTraitProps {
  readonly actId: ActId
  readonly traits: ReadonlyArray<TraitLabel>
}

const ChooseTrait: FunctionalComponent<ChooseTraitProps> = props => (
  <div>
    <h2>New jobs!</h2>
    <ul>
      {props.traits.map(trait => (
        <li key={trait}>
          <Link href={verusUrl(trait)}>{trait}</Link>
        </li>
      ))}
    </ul>
    <AutoAdvanceButton
      label="Next"
      timeLimit={4000}
      onClick={() => route(verusUrl())}
    />
  </div>
)

interface ChooseProps {
  readonly actId: string
}

const Choose: FunctionalComponent<ChooseProps> = props => {
  if (!isActId(props.actId)) {
    console.error("invalid act id given")
    route("/not-found", false)
    return <>Redirecting...</>
  }
  const { opponents } = ActSceneIndex[props.actId]
  if (opponents === undefined) {
    route(verusUrl())
    return <div>redirecting...</div>
  }
  return <ChooseTrait actId={props.actId} traits={opponents} />
}

export default Choose
