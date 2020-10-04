import { TraitLabel } from "./face-reader-labels"

export type ActId = "one" | "two" | "three"

export function isActId(
  someString: string | null | undefined
): someString is ActId {
  switch (someString) {
    case "one":
    case "two":
    case "three":
      return true
    default:
      return false
  }
}

type ActsScenesIndex = {
  readonly [K in ActId]: {
    readonly chats: ReadonlyArray<string>
    readonly next: ActId | null
    readonly opponents?: ReadonlyArray<TraitLabel>
  }
}

const index: ActsScenesIndex = {
  one: {
    opponents: ["Male", "Asian", "White"],
    next: "two",
    chats: ["hi", "this is scene 1"]
  },
  two: {
    opponents: ["Indian", "Gray Hair", "Bags Under Eyes"],
    next: "three",
    chats: ["hi", "this is scene 2"]
  },
  three: {
    opponents: ["Strong Nose-Mouth Lines", "Wearing Lipstick", "Flushed Face"],
    next: null,
    chats: ["hi", "this is scene 3"]
  }
}

export default index
