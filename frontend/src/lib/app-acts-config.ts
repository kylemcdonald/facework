import { BasicJob } from "./job"

export type ActId = "one" | "two" | "three" | "final"

export const ActsConfig: {
  readonly [K in ActId]: {
    readonly chats: ReadonlyArray<string>
    readonly next: ActId | null
    readonly availableJobs: ReadonlyArray<BasicJob>
  }
} = {
  one: {
    availableJobs: [
      {
        name: "Look male",
        trait: "Male",
        maxPay: 500,
        possibleReviews: new Map<number, string>([
          [0, "Just okay"],
          [0.4, "Very convincing look!"]
        ])
      },
      {
        name: "Look Asian",
        trait: "Asian",
        maxPay: 500,
        possibleReviews: new Map<number, string>([
          [0, "Just okay"],
          [0.4, "Very convincing look!"]
        ])
      },
      {
        name: "Look White",
        trait: "White",
        maxPay: 500,
        possibleReviews: new Map<number, string>([
          [0, "Just okay"],
          [0.4, "Very convincing look!"]
        ])
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
        maxPay: 500,
        possibleReviews: new Map<number, string>([
          [0, "Just okay"],
          [0.4, "Very convincing look!"]
        ])
      },
      {
        name: "Look Gray Hair",
        trait: "Gray Hair",
        maxPay: 500,
        possibleReviews: new Map<number, string>([
          [0, "Just okay"],
          [0.4, "Very convincing look!"]
        ])
      },
      {
        name: "Look Bags Under Eyes",
        trait: "Bags Under Eyes",
        maxPay: 500,
        possibleReviews: new Map<number, string>([
          [0, "Just okay"],
          [0.4, "Very convincing look!"]
        ])
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
        maxPay: 500,
        possibleReviews: new Map<number, string>([
          [0, "Just okay"],
          [0.4, "Very convincing look!"]
        ])
      },
      {
        name: "Look Wearing Lipstick",
        trait: "Wearing Lipstick",
        maxPay: 500,
        possibleReviews: new Map<number, string>([
          [0, "Just okay"],
          [0.4, "Very convincing look!"]
        ])
      },
      {
        name: "Look Flushed Face",
        trait: "Flushed Face",
        maxPay: 500,
        possibleReviews: new Map<number, string>([
          [0, "Just okay"],
          [0.4, "Very convincing look!"]
        ])
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
