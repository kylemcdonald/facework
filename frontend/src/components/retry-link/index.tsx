import { FunctionalComponent, h } from "preact"
import { Link } from "preact-router"
import * as style from "./style.css"

export const RetryLink: FunctionalComponent = () => (
  <div className={style.startOverLinkContainer}>
    <Link href="/" className={style.startOverLink}>
      <span>
        Start over
        <img src="/assets/images/arrow.svg" height="15" />
      </span>
    </Link>
  </div>
)
