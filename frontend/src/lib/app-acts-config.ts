import { PotentialJob } from "./job"

export type ActId = "one" | "two" | "three" | "final"

export const ActsConfig: {
  readonly [K in ActId]: {
    readonly chats: ReadonlyArray<string>
    readonly next: ActId | null
    readonly availableJobs: ReadonlyArray<PotentialJob>
  }
} = {
  one: {
    availableJobs: [
      {
        name: "Look male",
        trait: "Male",
        basePay: 700,
        maxTip: 500,
        possibleReviews: [
          { minScore: 0, review: "Eh, just okay." },
          { minScore: 0.4, review: "That was pretty great!" }
        ]
      },
      {
        name: "Look Asian",
        trait: "Asian",
        basePay: 700,
        maxTip: 500,
        possibleReviews: [
          { minScore: 0, review: "Eh, just okay." },
          { minScore: 0.4, review: "That was pretty great!" }
        ]
      },
      {
        name: "Look White",
        trait: "White",
        basePay: 700,
        maxTip: 500,
        possibleReviews: [
          { minScore: 0, review: "Eh, just okay." },
          { minScore: 0.4, review: "That was pretty great!" }
        ]
      }
    ],
    next: "two",
    chats: ["hi", "this was scene 1", "now for scene 2"]
  },
  two: {
    availableJobs: [
      {
        name: "Look Indian",
        trait: "Indian",
        basePay: 700,
        maxTip: 500,
        possibleReviews: [
          { minScore: 0, review: "Eh, just okay." },
          { minScore: 0.4, review: "That was pretty great!" }
        ]
      },
      {
        name: "Look Gray Hair",
        trait: "Gray Hair",
        basePay: 700,
        maxTip: 500,
        possibleReviews: [
          { minScore: 0, review: "Eh, just okay." },
          { minScore: 0.4, review: "That was pretty great!" }
        ]
      },
      {
        name: "Look Bags Under Eyes",
        trait: "Bags Under Eyes",
        basePay: 700,
        maxTip: 500,
        possibleReviews: [
          { minScore: 0, review: "Eh, just okay." },
          { minScore: 0.4, review: "That was pretty great!" }
        ]
      }
    ],
    next: "three",
    chats: ["hi", "this has been scene 2", "let's do scene 3 now"]
  },
  three: {
    availableJobs: [
      {
        name: "Look Strong Nose-Mouth Lines",
        trait: "Strong Nose-Mouth Lines",
        basePay: 700,
        maxTip: 500,
        possibleReviews: [
          { minScore: 0, review: "Eh, just okay." },
          { minScore: 0.4, review: "That was pretty great!" }
        ]
      },
      {
        name: "Look Wearing Lipstick",
        trait: "Wearing Lipstick",
        basePay: 700,
        maxTip: 500,
        possibleReviews: [
          { minScore: 0, review: "Eh, just okay." },
          { minScore: 0.4, review: "That was pretty great!" }
        ]
      },
      {
        name: "Look Flushed Face",
        trait: "Flushed Face",
        basePay: 700,
        maxTip: 500,
        possibleReviews: [
          { minScore: 0, review: "Eh, just okay." },
          { minScore: 0.4, review: "That was pretty great!" }
        ]
      }
    ],
    next: "final",
    chats: ["hi", "this is the end of scene 3"]
  },
  final: {
    next: null,
    chats: [],
    availableJobs: []
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
    autoclickTimeout: 10 * 1000
  }
}
export const DoJobConfig: BasePageConfig & { scoringTimeLimit: number } = {
  scoringTimeLimit: 15 * 1000,
  nextButton: {
    autoclickTimeout: 1000
  }
}
export const JobSummaryConfig: BasePageConfig = {
  nextButton: {
    autoclickTimeout: 10 * 1000
  }
}
export const ChatPageConfig: BasePageConfig & {
  messageAppearanceInterval: number
} = {
  nextButton: {
    autoclickTimeout: 10 * 1000
  },
  messageAppearanceInterval: 1000
}
