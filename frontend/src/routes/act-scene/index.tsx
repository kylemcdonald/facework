import { FunctionalComponent, h } from "preact"
import { Link } from "preact-router"
import Exposition from "../../components/exposition"
import ActSceneIndex from "./acts-scenes"

interface ActSceneProps {
  id: string
  sceneId?: string
}

const ActScene: FunctionalComponent<ActSceneProps> = props => {
  const actContent = ActSceneIndex[props.id]
  const sceneIndex = (new Number(props.sceneId) ?? 0).valueOf()
  const sceneContent = actContent.scenes[sceneIndex]
  const nextUrl =
    sceneIndex < actContent.scenes.length - 1
      ? `/act/${props.id}/${sceneIndex + 1}`
      : actContent.next !== null
      ? `/act/${actContent.next}/`
      : "/epilogue"
  return (
    <Exposition>
      {sceneContent}
      <Link href={nextUrl}>Next</Link>
    </Exposition>
  )
}

export default ActScene
