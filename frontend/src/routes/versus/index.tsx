import { FunctionalComponent, h } from "preact"
import Battle from "../../components/battle"
import { nextActUrl, isActId } from "../act-scene/acts-scenes"
import { Link, route } from "preact-router"
import { useCallback } from "preact/hooks"
import { isTraitLabel } from "../../lib/face-reader-labels"

interface VersusProps {
  actId: string
  trait?: string
}

const Versus: FunctionalComponent<VersusProps> = props => {
  if (!isActId(props.actId)) {
    console.error("invalid act id given")
    route("/not-found", false)
    return <>Redirecting...</>
  }
  const getInitialTrait = useCallback(
    () => (isTraitLabel(props.trait) ? props.trait : undefined),
    [props.actId, props.trait]
  )
  return (
    <div>
      <h1>Versus</h1>
      <p>
        {`Let's `}
        <em>FACE OFF</em>.
      </p>
      <p>
        <Link href={nextActUrl(props.actId)}>Continue</Link>
      </p>
      <Battle getInitialTrait={getInitialTrait} />
    </div>
  )
}

export default Versus
