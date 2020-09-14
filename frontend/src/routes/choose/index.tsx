import { FunctionalComponent, h } from "preact"
import ActSceneIndex, { actsUrl } from "../act-scene/acts-scenes"
import { route, Link } from "preact-router"

const verusUrl = (actId: string, trait?: string): string =>
  actsUrl(actId, ["versus", trait ?? ""])

interface ChooseTraitProps {
  actId: string
  traits: ReadonlyArray<string>
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
  id: string
}

const Choose: FunctionalComponent<ChooseProps> = props => {
  const { opponents } = ActSceneIndex[props.id]
  if (opponents === undefined) {
    route(verusUrl(props.id))
    return <div>redirecting...</div>
  }
  return <ChooseTrait actId={props.id} traits={opponents} />
}

export default Choose
