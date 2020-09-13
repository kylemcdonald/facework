import { FunctionalComponent, h } from "preact"
import { Link } from "preact-router"
import Exposition from "../../components/exposition"
import ActSceneIndex, { nextSceneUrl } from "./acts-scenes"

interface ActSceneProps {
  id: string
  sceneId?: string
}

const ActScene: FunctionalComponent<ActSceneProps> = props => {
  const actContent = ActSceneIndex[props.id]
  const sceneIndex = (new Number(props.sceneId) ?? 0).valueOf()
  const sceneContent = actContent.scenes[sceneIndex]
  const nextUrl = nextSceneUrl(props.id, sceneIndex)
  return (
    <Exposition>
      {sceneContent}
      <Link href={nextUrl}>Next</Link>
    </Exposition>
  )
}

export default ActScene
