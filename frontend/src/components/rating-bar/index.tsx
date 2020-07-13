import { FunctionalComponent, h } from "preact"

interface RatingBarProps {
  /** Must be between 0 and 1.0 */
  value: number | undefined
}

const RatingBar: FunctionalComponent<RatingBarProps> = (
  props: RatingBarProps
) => {
  return <progress value={props.value} />
}

/** Return a number between 0 and 1.0 */
export function normalizeValue(value: number, max: number): number {
  return value / max
}

export default RatingBar
