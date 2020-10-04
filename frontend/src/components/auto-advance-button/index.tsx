import { FunctionalComponent, h } from "preact"
import { useEffect, useState } from "preact/hooks"

interface AutoAdvanceButtonProps {
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
    <meter
      min={0}
      value={timeLeftRatio}
      max={1}
      onClick={props.onClick}
      key="auto-advance-button"
    >
      {timeLeftRatio}
    </meter>
  )
}

export default AutoAdvanceButton
