import { FunctionalComponent, h } from "preact"
import * as style from "./style.css"

const Exposition: FunctionalComponent = props => (
  <div class={style.wrapper}>{props.children}</div>
)

export default Exposition
