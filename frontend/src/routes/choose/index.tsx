import { FunctionalComponent, h } from "preact"
import ActSceneIndex, {
  actsUrl,
  isActId,
  ActId
} from "../act-scene/acts-scenes"
import { route, Link } from "preact-router"
import { TraitLabel } from "../../lib/face-reader-labels"

const verusUrl = (actId: string, trait?: TraitLabel): string =>
  actsUrl(actId, ["versus", trait ?? ""])

interface ChooseTraitProps {
  readonly actId: ActId
  readonly traits: ReadonlyArray<TraitLabel>
}

const ChooseTrait: FunctionalComponent<ChooseTraitProps> = props => (
  <div>
    <h2>Choose your challenge</h2>
    <ul>
      {props.traits.map(trait => (
        <li key={trait}>
          <Link href={verusUrl(props.actId, trait)}>{trait}</Link>
        </li>
      ))}
    </ul>
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
    route(verusUrl(props.actId))
    return <div>redirecting...</div>
  }
  return <ChooseTrait actId={props.actId} traits={opponents} />
}

export default Choose
