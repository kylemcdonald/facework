import { FunctionalComponent, h } from "preact"
import { Link } from "preact-router"

export const ReloadLink: FunctionalComponent = () => (
  <Link onClick={(): void => location.reload()}>Retry</Link>
)
