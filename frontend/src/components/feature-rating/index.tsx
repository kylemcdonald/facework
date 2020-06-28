import { FunctionalComponent, h } from "preact"

interface FeatureRatingProps {
  /** Must be between 0 and 1.0 */
  value: number
}

const FeatureRating: FunctionalComponent<FeatureRatingProps> = (
  props: FeatureRatingProps
) => {
  return <progress value={props.value} />
}

/** Return a number between 0 and 1.0 */
export function normalizeValue(value: number, max: number) {
  return value / max
}

export default FeatureRating
