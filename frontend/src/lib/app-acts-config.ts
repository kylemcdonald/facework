import { PotentialJob } from "./job"

/** (Literal) id for the first act */
export const firstActId = "one"
/** (Literal) id for the last act */
export const finalActId = "final"
/** Ids for all acts in-between */
export type IntermediateActId = "two" | "three" | "four" | "five"

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
        name: "Food Delivery",
        trait: "Smiling",
        maxTip: 250,
        possibleReviews: [
          {
            minScore: 0,
            review:
              "What a disturbing experience! I couldn't tell if they were angry, confused, or just baring their teeth. But this delivery person almost ruined our meal"
          },
          {
            minScore: 0.4,
            review: "Friendly delivery! Their smile was the perfect appetizer."
          }
        ]
      }
    ],
    next: "two"
  },
  two: {
    availableJobs: [
      {
        name: "Tutor",
        trait: "Frowning",
        maxTip: 500,
        possibleReviews: [
          {
            minScore: 0,
            review:
              "This person's frown was about as intimidating as a baby kitten! My kids weren't scared at all. Terrible tutor."
          },
          {
            minScore: 0.4,
            review:
              "Great strict tutor! Their intimidating frown kept my kids in line while studying."
          }
        ]
      },
      {
        name: "Babysitter",
        trait: "Eyes Open",
        maxTip: 500,
        possibleReviews: [
          {
            minScore: 0,
            review:
              "This Faceworker was clueless! Our kids were able to escape from them almost instantly. They had to call us back from our night out to chase down our kids in the neighborhood."
          },
          {
            minScore: 0.4,
            review:
              "Our kids are escape artists! But this eagle-eyed Faceworker was able to stop their every breakout attempt. Could work as a prison guard! 10/10."
          }
        ]
      },
      {
        name: "Dental School Practice Subject",
        trait: "Mouth Wide Open",
        maxTip: 500,
        possibleReviews: [
          {
            minScore: 0,
            review:
              "A disaster! Couldn't keep their mouth open long enough for even the most basic exams. Even bit one student! Outrageous!"
          },
          {
            minScore: 0.4,
            review:
              "Perfect for our students! They held their mouth open for hours without complaint. Plus it turned out they had some interesting tooth decay as well!"
          }
        ]
      },
      {
        name: "Food Delivery",
        trait: "Teeth Not Visible",
        maxTip: 500,
        possibleReviews: [
          {
            minScore: 0,
            review:
              "We absolutely HATE seeing teeth before we eat. It turns our stomachs. This delivery driver couldn't keep their nasty chompers behind their lips for 30 seconds. Meal ruined!"
          },
          {
            minScore: 0.4,
            review:
              "We absolutely HATE seeing teeth before we eat. It's disgusting and ruins our appetite. This delivery driver kept their nasty chompers safely hidden away. Thank you!"
          }
        ]
      }
    ],
    chats: [
      "Hi!",
      "Hello?",
      "Can you see this?",
      "No wait! Don't respond.",
      "They might be monitoring your chat.",
      "I'm Pat. I'm a Faceworker too. Just like you.",
      "Well I've been doing it a bit longer and I've discovered some things you might find interesting",
      "Oh damnit. I've gotta go. Another job. Can't let my rating slide with what we're planning.",
      "I'll try to message you again soon. Hang in there!"
    ],
    next: "three"
  },
  three: {
    availableJobs: [
      {
        name: "Musician",
        trait: "Wearing Necktie",
        maxTip: 1000,
        possibleReviews: [
          {
            minScore: 0,
            review:
              "We were hoping for the dignified formality of a true classical musician. But this Faceworker's getup was ridiculous! More like a clown than a concertmaster!"
          },
          {
            minScore: 0.4,
            review:
              "We wanted a formal performance for our romantic beach dinner and this well-suited Faceworker delivered!"
          }
        ]
      },
      {
        name: "Driving Teacher",
        trait: "No Eyewear",
        maxTip: 1000,
        possibleReviews: [
          {
            minScore: 0,
            review:
              "I don't think it's too much to ask to get a driving teacher that CAN SEE. And yet you sent us this four-eyed Faceworker. Might as well have been as blind as a bat. I was too scared to get in the car!"
          },
          {
            minScore: 0.4,
            review:
              "As the parent of a new driver there's enough to be scared about already. Thank you for sending a Faceworker with good crisp vision. It put our mind at ease."
          }
        ]
      },
      {
        name: "Cool Babysitter",
        trait: "Sunglasses",
        maxTip: 1000,
        possibleReviews: [
          {
            minScore: 0,
            review:
              "Our kids are teenagers now and they absolutely HATE that we keep getting babysitters for them. And this Faceworker was SO UNCOOL they couldn't even be bothered to wear sunglasses. The kids hated them! Disaster!"
          },
          {
            minScore: 0.4,
            review:
              "Our kids are teenagers now and they absolutely HATE that we keep getting babysitters for them. So it helps when the babysitters are cool. And this cool cat wore their sunglasses indoors and won our kids' grudging respect."
          }
        ]
      },
      {
        name: "Food Delivery",
        trait: "Fully Visible Forehead",
        maxTip: 1000,
        possibleReviews: [
          {
            minScore: 0,
            review:
              "We just HATE getting our food delivered by sweaty creeps. It turns our stomachs. This FACEWORK's brow was hidden! Anything could have been lurking under there. TOTALLY DISGUSTING!"
          },
          {
            minScore: 0.4,
            review:
              "We just HATE getting our food delivered by sweaty creeps. It turns our stomachs. This Faceworker had a clean dry brow. The perfect appetizer for any meal."
          }
        ]
      },
      {
        name: "Substitute Grandfather",
        trait: "Gray Hair",
        maxTip: 1000,
        possibleReviews: [
          {
            minScore: 0,
            review:
              "We're not quite ready to tell our kids that Pop Pop passed on. We just wanted to give them one last day with their beloved grandpa spoiled everything and now the kids won't stop crying!"
          },
          {
            minScore: 0.4,
            review:
              'We\'re not quite ready to tell our kids that Pop Pop passed on. This Faceworker helped us pretend so they could have one more nice day with their beloved "grandfather".'
          }
        ]
      },
      {
        name: "Barber School Test Subject",
        trait: "5 o Clock Shadow",
        maxTip: 1000,
        possibleReviews: [
          {
            minScore: 0,
            review:
              "A real let down! Barely enough stubble for part of one shaving lesson. And complained constantly about getting just a few nicks and cuts."
          },
          {
            minScore: 0.4,
            review:
              "Our students loved this Faceworker! Their scraggly beard was perfect for our Intro to Shaving class and they didn't complain about the nicks and cuts!"
          }
        ]
      },
      {
        name: "Food Delivery",
        trait: "No Beard",
        maxTip: 1000,
        possibleReviews: [
          {
            minScore: 0,
            review:
              "You can call us picky but we find facial hear TOTALLY DISGUSTING on anyone handling our food. I'd just like to eat a meal without picturing short curly hairs hiding in my food. Is that too much to ask?!? Apparently so accoring to this fuzzy Faceworker."
          },
          {
            minScore: 0.4,
            review:
              "Some may call us picky but we find facial hair so gross on food service workers. This Faceworker met our needs perfectly. Smooth, hairless, and hygenic."
          }
        ]
      }
    ],
    chats: [
      "Hi again!",
      "This is Pat.",
      "(In case you had other friends that hacked into the Facework messaging system to talk to you lol)",
      "Poking around the database I noticed how your bank balance is doing. Ouch.",
      "Didn't mean to invade your privacy or anything. But it's ridiculous how bad Facework's security is",
      "And if I hadn't been just a bit nosy I couldn't have done this {{grandTotal}}",
      "That should help a bit!",
      "Now keep your chin up",
      "Oh lol that sounded like Facework didn't it! :)",
      "Anyways. Do whatever you want with your face!",
      "Next time you hear from me it'll be for something big"
    ],
    next: "four"
  },
  four: {
    availableJobs: [
      {
        name: "Eyebrow Threading Model",
        trait: "Bushy Eyebrows",
        maxTip: 2000,
        possibleReviews: [
          {
            minScore: 0,
            review:
              "This Faceworker's brows barely qualified as bushy at all! How are we supposed to advertise our eyebrow threading service when these before and after pictures look identical! 1/5 stars!"
          },
          {
            minScore: 0.4,
            review:
              "This Faceworker made the perfect before and after for our eyebrow threading service! A great bushy eyebrow for us to tame. Thank you!"
          }
        ]
      },
      {
        name: "Food Delivery",
        trait: "Chubby",
        maxTip: 2000,
        possibleReviews: [
          {
            minScore: 0,
            review:
              "Never trust a skinny chef they say! Well we feel the same about our delivery people! How are we supposed to trust a meal coming from someone who looks like they've never eaten one!"
          },
          {
            minScore: 0.4,
            review:
              "Never trust a skinny chef they say! Well we feel the same about our delivery people! Nothing whets our appetites more for a meal than having it delivered by someone like this Facework who clearly enjoys food! Bon appetit!"
          }
        ]
      }
    ],
    chats: [
      "Hi!",
      "Ok don't hate me but I've paused your job queue for a second",
      "I've got something important to tell you",
      "You're not alone",
      "I mean it's not just me screwing around in Facework's systems lol",
      "There's a group of us.",
      "We're a group. ",
      "We're called Face Off. Or maybe Fuckwork. We're still debating. What do you think? Is Fuckwork too harsh?",
      "Anyway",
      "We're working on a plan",
      "We think we might be able to seize control of all of Facework.",
      "But we're gonna need your help. Are you up for it?",
      "No wait! Don't answer. I almost forgot they might still be logging your keystrokes",
      "I'll just assume you're in :)"
    ],
    next: "five"
  },
  five: {
    availableJobs: [
      {
        name: "Babysitter Study Aid",
        trait: "Child",
        maxTip: 4000,
        possibleReviews: [
          {
            minScore: 0,
            review:
              "At Babysitting Academy we pride ourselves on giving our students real world babysitting training. But his Faceworker was far older than promised! They weren't fussy and they barely cried at bed time. A total waste of time."
          },
          {
            minScore: 0.4,
            review:
              "At Babysitting Academy we know there's no better prep for our students than practicing on real kids! This little tot was a great sport. They screamed and yelled and cried all through practice bed time. So realistic!"
          }
        ]
      },
      {
        name: "Food Delivery",
        trait: "Indian",
        maxTip: 4000,
        possibleReviews: [
          {
            minScore: 0,
            review:
              "We've been world travelers for years and love authentic experiences of other cultures. This Faceworker totally ruined our Indian takeout experience. Were they supposed to be Indian? Don't make me laugh! And the Biryani was little better!"
          },
          {
            minScore: 0.4,
            review:
              "We just love authentic experiences of other cultures! That's why it's so important to us that our Indian food be delivered by a real Indian. And this Faceworker was perfect. It felt like being in Mumbai!"
          }
        ]
      }
    ],
    chats: [
      "Hi!",
      "Are you ready for the big day? Got your revolution pants on?",
      "Sorry that was super cheesy. I'm just excited :)",
      "Anyway. Here's the plan",
      "We've hacked into the Facework office internal network",
      "Of course they're super into biometric security",
      "So we need someone who can pass themselves off as the Facework CEO",
      "We can't get past the system externally but we can wire up your camera to the access lock",
      "So if you can pull off CEO Face we'll be in!",
      "But there are some...interesting...security measures in place if things go wrong",
      "So don't get caught lol",
      "And you might want to prep a go bag",
      "Good luck!"
    ],
    next: "final"
  },
  final: {
    winLoseThreshold: 0.3,
    availableJobs: [
      {
        name: ".';DROP TABLE traits",
        trait: "CEO",
        maxTip: 1000000000,
        possibleReviews: [
          {
            minScore: 0,
            review: "#FATAL_ERROR: NO VALUES FOUND';';#"
          },
          {
            minScore: 0.4,
            review: "err -1 no error (no error): {{}} // todo: fix"
          }
        ]
      }
    ],
    winChats: [
      "omg!",
      "It worked! You did it!",
      "We've got total control of their systems",
      "Look the news has picked it up!!!",
      "Oh and here's a fun way to celebrate [Increase bank account to super high number]",
      "Now we've just got to figure out how what to do with Facework",
      "Should we shut it down? Or maybe there's some way we could use it for good?",
      "Anyway",
      "We can talk about it at the party! Keep your head down and I'll send you directions ",
      "Can't wait to see your actual face :)"
    ],
    loseChats: [
      "Oh no they caught you!",
      "Is your go bag prepped? You've gotta get out of there. The feds will be on their way for sure",
      "But listen. It wasn't in vain",
      "While they're were distracted with you one of our other members was able to get in with another face",
      "We've got total control of their systems",
      "Look the news has picked it up!!!",
      "Oh and here's someting to make your getaway into more of a vacation :) [Increase bank account to super high number]",
      "Now we've just got to figure out how what to do with Facework",
      "Should we shut it down? Or maybe there's some way we could use it for good?",
      "Anyway",
      "We can talk about it at the party! Keep your head down and I'll send you directions ",
      "Can't wait to see your actual face :)"
    ]
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
    autoclickTimeout: 15 * 1000
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
    autoclickTimeout: 20 * 1000
  }
}
export const ChatPageConfig: BasePageConfig & {
  messageAppearanceInterval: number
} = {
  nextButton: {
    autoclickTimeout: 5 * 1000
  },
  messageAppearanceInterval: 2000
}
