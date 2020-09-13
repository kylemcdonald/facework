import { FunctionalComponent, h } from "preact"
import Battle from "../../components/battle"
import { nextActUrl } from "../act-scene/acts-scenes"
import { Link } from "preact-router"

interface VersusProps {
  actId: string
  trait?: string
}

const Versus: FunctionalComponent<VersusProps> = props => (
  <div>
    <Battle />
    <Link href={nextActUrl(props.actId)}>Continue</Link>
  </div>
)

export default Versus
