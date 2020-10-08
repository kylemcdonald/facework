import { FunctionalComponent, h } from "preact"
import { useEffect, useState } from "preact/hooks"
import * as style from "./style.css"

interface AutoAdvanceButtonProps {
  /** Button label */
  readonly label: string
  /** How long before the button fires on its own, in **milliseconds** */
  readonly timeLimit: number
  /** Called on user click or when timeout is reached */
  readonly onClick: () => void
}

const AutoAdvanceButton: FunctionalComponent<AutoAdvanceButtonProps> = (
  props: AutoAdvanceButtonProps
) => {
  const [timeLeftRatio, setTimeLeftRatio] = useState(props.timeLimit)
  useEffect(() => {
    const startTime = Date.now()
    const intervalId = setInterval(() => {
      const newTimeLeft = (Date.now() - startTime) / props.timeLimit
      if (newTimeLeft >= 1) {
        clearInterval(intervalId)
        props.onClick()
      }
      setTimeLeftRatio(newTimeLeft)
    }, 150)
    return (): void => clearInterval(intervalId)
  }, [props.timeLimit])
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
