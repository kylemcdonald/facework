import { FunctionalComponent, h } from "preact"
import { Link, route } from "preact-router"
import Exposition from "../../components/exposition"
import ActSceneIndex, { nextSceneUrl, isActId } from "./acts-scenes"

interface ActSceneProps {
  readonly actId: string
  readonly sceneId?: string
}

const ActScene: FunctionalComponent<ActSceneProps> = props => {
  if (!isActId(props.actId)) {
    console.error("invalid act id given")
    route("/not-found", false)
    return <>Redirecting...</>
  }
  const actContent = ActSceneIndex[props.actId]
  const sceneIndex = (new Number(props.sceneId) ?? 0).valueOf()
  const sceneContent = actContent.scenes[sceneIndex]
  const nextUrl = nextSceneUrl(props.actId, sceneIndex)
  return (
    <Exposition>
      {sceneContent}
      <Link href={nextUrl}>Next</Link>
    </Exposition>
  )
}

export default ActScene
