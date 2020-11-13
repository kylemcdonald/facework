import { FunctionalComponent, h } from "preact"
import { Link } from "preact-router"
import * as style from "./style.css"

export const ReloadLink: FunctionalComponent = () => (
  <div className={style.startOverLinkContainer}>
    <Link
      onClick={(): void => location.reload()}
      className={style.startOverLink}
    >
      <span>Start over</span>
      <img src="/assets/images/arrow.svg" height="15" />
    </Link>
  </div>
)
