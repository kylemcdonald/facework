import { FunctionalComponent, h } from "preact"
import Battle from "../../components/battle"
import { Link } from "preact-router"
import { useCallback } from "preact/hooks"
import { isTraitLabel } from "../../lib/face-reader-labels"

interface VersusProps {
  readonly trait?: string
}

const Versus: FunctionalComponent<VersusProps> = props => {
  const getInitialTrait = useCallback(
    () => (isTraitLabel(props.trait) ? props.trait : undefined),
    [props.trait]
  )
  return (
    <div>
      <h1>Do Job</h1>
      <p>
        <Link href={"/job-summary"}>Continue</Link>
      </p>
      <Battle getInitialTrait={getInitialTrait} />
    </div>
  )
}

export default Versus
