import { FunctionalComponent, h } from "preact"
import * as style from "./style.css"
import { useCountdownTimer } from "../../lib/use-countdown-timer"

interface AutoAdvanceButtonProps {
  /** Button label */
  readonly label: string
  /** How long before the button fires on its own, in **milliseconds** */
  readonly autoClickTimeout: number
  /** Called on user click or when timeout is reached */
  readonly onClick: () => void
}

const AutoAdvanceButton: FunctionalComponent<AutoAdvanceButtonProps> = (
  props: AutoAdvanceButtonProps
) => {
  const timeLeftRatio = useCountdownTimer(props.autoClickTimeout, props.onClick)
  return (
    <div class={style.autoAdvanceButton} onClick={props.onClick}>
      <progress value={timeLeftRatio} key="auto-advance-button">
        {timeLeftRatio}
      </progress>
      <span class={style.label}>{props.label}</span>
    </div>
  )
}

export default AutoAdvanceButton
