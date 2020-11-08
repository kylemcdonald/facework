import { PotentialJob } from "./job"

/** (Literal) id for the first act */
export const firstActId = "one"
/** (Literal) id for the last act */
export const finalActId = "final"
/** Ids for all acts in-between */
export type IntermediateActId = "two" | "three"

/** Union of all possible Act Ids */
export type ActId = typeof firstActId | IntermediateActId | typeof finalActId

export const isIntermediateAct = (actId: ActId): actId is IntermediateActId =>
  actId !== firstActId && actId !== finalActId

/** Properties common to all acts in the game */
type BaseAct = {
  readonly availableJobs: ReadonlyArray<PotentialJob>
}

/** Properties of the first act */
type FirstAct = BaseAct & {
  readonly next: ActId
}

/** Properties of acts in the middle of the game (not first or last) */
export type IntermediateAct = BaseAct & {
  readonly chats: ReadonlyArray<string>
  readonly next: ActId
}

/** Properties of the final act */
type FinalAct = BaseAct & {
  /** Between 0 and 1 */
  readonly winLoseThreshold: number
  /** Chats shown if user's score is *above* winLoseThreshold */
  readonly winChats: IntermediateAct["chats"]
  /** Chats shown if user's score is *below* winLoseThreshold */
  readonly loseChats: IntermediateAct["chats"]
}

export const ActsConfig: {
  readonly [firstActId]: FirstAct
  readonly [finalActId]: FinalAct
} & { readonly [K in IntermediateActId]: IntermediateAct } = {
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
    next: "two"
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
    winLoseThreshold: 0.3,
    winChats: [],
    loseChats: [],
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
