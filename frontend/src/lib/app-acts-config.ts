import { TraitLabel } from "./face-reader-labels"

export type ActId = "one" | "two" | "three" | "final"

export const ActsConfig: {
  readonly [K in ActId]: {
    readonly chats: ReadonlyArray<string>
    readonly next: ActId | null
    readonly opponents?: ReadonlyArray<TraitLabel>
  }
} = {
  one: {
    opponents: ["Male", "Asian", "White"],
    next: "two",
    chats: ["hi", "this was scene 1", "now for scene 2"]
  },
  two: {
    opponents: ["Indian", "Gray Hair", "Bags Under Eyes"],
    next: "three",
    chats: ["hi", "this has been scene 2", "let's do scene 3 now"]
  },
  three: {
    opponents: ["Strong Nose-Mouth Lines", "Wearing Lipstick", "Flushed Face"],
    next: "final",
    chats: ["hi", "this is the end of scene 3"]
  },
  final: {
    next: null,
    chats: []
  }
}

type BasePageConfig = {
  readonly nextButton: {
    /** in milliseconds */
    readonly autoclickTimeout: number
  }
}

export const ChooseJobConfig: BasePageConfig = {
  nextButton: {
    autoclickTimeout: 6000
  }
}
export const DoJobConfig: BasePageConfig = {
  nextButton: {
    autoclickTimeout: 6000
  }
}
export const JobSummaryConfig: BasePageConfig = {
  nextButton: {
    autoclickTimeout: 6000
  }
}
export const ChatPageConfig: BasePageConfig & {
  messageAppearanceInterval: number
} = {
  nextButton: {
    autoclickTimeout: 6000
  },
  messageAppearanceInterval: 1000
}
