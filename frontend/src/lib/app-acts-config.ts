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
        name: "Food Delivery: Friendly",
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
        name: "Dental Training",
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
        name: "Food Delivery: Discrete",
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
      },
      {
        name: "Portrait Photographer",
        trait: "Soft Lighting",
        maxTip: 500,
        possibleReviews: [
          {
            minScore: 0,
            review: "Total amateur. Results looked like DMV pictures!!!"
          },
          {
            minScore: 0.4,
            review:
              "This Faceworker was a master of the lens! They made us look 20 years younger."
          }
        ]
      },
      {
        name: "Camp Counselor",
        trait: "Outdoor",
        maxTip: 500,
        possibleReviews: [
          {
            minScore: 0,
            review:
              "We wanted someone outdoorsy, at one with nature to take our kids on adventure. This Faceworker looked like they'd never been outside in their lives! Ugh."
          },
          {
            minScore: 0.4,
            review:
              "We wanted someone outdoorsy, at one with nature to take our kids on adventure. This Faceworker was crunchy as granola! Perfect!"
          }
        ]
      }
    ],
    chats: [
      "\ud83c\udf1a\ud83c\udf1a\ud83c\udf1a",
      "hello?",
      "can you see this?",
      "no wait! don't answer!",
      "they're probably watching everything you do lol",
      "i'm pat. i'm a faceworker too. just like you.",
      "i mean i've been doing it longer... and i've discovered some things \ud83d\ude07",
      "sometimes you can fool the AI just by rotating your face, making faces..",
      "or holding up objects or your hands in front of your face!",
      "argh. gotta go. another audition. can't let my balance slide w what we're planning",
      "i'll message you soon. hang in there!"
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
        name: "Food Delivery: Clean",
        trait: "Fully Visible Forehead",
        maxTip: 1000,
        possibleReviews: [
          {
            minScore: 0,
            review:
              "We just HATE getting our food delivered by sweaty creeps. It turns our stomachs. This FACEWORKER's brow was hidden! Anything could have been lurking under there. TOTALLY DISGUSTING!"
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
        name: "Barber Training",
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
        name: "Stand-In Father",
        trait: "Mustache",
        maxTip: 1000,
        possibleReviews: [
          {
            minScore: 0,
            review:
              'Every child needs a father figure! Especially our grandson with his "two moms". But this Faceworker\'s clean shaven upper lip was as feminine as could be!'
          },
          {
            minScore: 0.4,
            review:
              "Every child needs a father figure! Especially our grandson with his \"two moms\". This Faceworker's amazing 'stache really showed up for the patriarchy!"
          }
        ]
      },
      {
        name: "Food Delivery: Sanitary",
        trait: "No Beard",
        maxTip: 1000,
        possibleReviews: [
          {
            minScore: 0,
            review:
              "Call us picky but facial hair is TOTALLY DISGUSTING on anyone handling our food. I wanna eat a meal without picturing short curly hairs hiding in my food! No fuzzy Faceworkers!"
          },
          {
            minScore: 0.4,
            review:
              "Some may call us picky but we find facial hair so gross on food service workers. This Faceworker met our needs perfectly. Smooth, hairless, and hygenic."
          }
        ]
      },
      {
        name: "Hair Care Tester",
        trait: "Receding Hairline",
        maxTip: 1000,
        possibleReviews: [
          {
            minScore: 0,
            review:
              "Our new procedure is going to revolutionize men's hair. But how are we supposed to revitalize hair when there's already plenty on this Faceworker's head? Experiment failed."
          },
          {
            minScore: 0.4,
            review:
              "Our new procedure is going to revolutionize men's hair. This Faceworker helped us do some of our first experiments! Thanks and sorry about the burns!"
          }
        ]
      }
    ],
    chats: [
      "\ud83d\ude48\ud83d\ude48\ud83d\ude48",
      "it's pat",
      "(in case you have other friends hacking facework to message you lol)",
      "poking around the database i noticed your balance isn't great \ud83d\ude2c",
      "it's like facework spends all their cash on AI researchers instead of security",
      "and i found a way to move money around \ud83d\ude08",
      "i just added $100 to your balance. now you're at {{grandTotal}}",
      "keep your chin up!",
      "i mean.. do whatever you want w your face \ud83d\ude02",
      "maybe that's why everyone looks the same these days",
      "too many faceworkers, all making the faces we're told to make",
      "anyway, next time you hear from me it's gonna be something big \ud83d\ude43"
    ],
    next: "four"
  },
  four: {
    availableJobs: [
      {
        name: "Perfume Tester",
        trait: "Big Nose",
        maxTip: 2000,
        possibleReviews: [
          {
            minScore: 0,
            review:
              "You call that a nose? I don't think this Faceworker could have smelled shit if they were stepping in it."
          },
          {
            minScore: 0.4,
            review:
              "An olfactory Einstein! The huge honker on this Faceworker made them the perfect tester for our experimental perfumes. Hope you don't experience any side effects from the chemicals!"
          }
        ]
      },
      {
        name: "Cosmetology Training",
        trait: "Bushy Eyebrows",
        maxTip: 2000,
        possibleReviews: [
          {
            minScore: 0,
            review:
              "This Faceworker's brows barely qualified as bushy at all! How are we supposed to advertise our eyebrow threading service when these before and after pictures look identical!"
          },
          {
            minScore: 0.4,
            review:
              "This Faceworker made the perfect before and after for our eyebrow threading service! A great bushy eyebrow for us to tame. Thank you!"
          }
        ]
      },
      {
        name: "Diet Pills Model",
        trait: "Double Chin",
        maxTip: 2000,
        possibleReviews: [
          {
            minScore: 0,
            review:
              "Double chin? This Faceworker barely had one chin! They looked more like the After model for our ad than the Before."
          },
          {
            minScore: 0.4,
            review:
              "They made the perfect model for the Before picture for our diet pills infomercial. Their multiple chins were repellant. Just what we were looking for!"
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
              "Never trust a skinny chef they say! Well we feel the same about our delivery people! Nothing whets our appetites more for a meal than having it delivered by someone like this Faceworker who clearly enjoys food!"
          }
        ]
      },
      {
        name: "Mall Santa",
        trait: "Rosy Cheeks",
        maxTip: 2000,
        possibleReviews: [
          {
            minScore: 0,
            review:
              "This Santa's cheeks were barely even flushed let alone rosy! Its ok if you have no professional integrity but to leave children crying on Chrismas? Don't you have a heart?!?"
          },
          {
            minScore: 0.4,
            review:
              "What a jolly Faceworker! Their bright red cheeks brought holiday cheer to all the kids in front of Nordstroms."
          }
        ]
      },
      {
        name: "Stand-up Audience",
        trait: "Strong Nose-Mouth Lines",
        maxTip: 2000,
        possibleReviews: [
          {
            minScore: 0,
            review:
              "This Faceworker didn't laugh at a single joke and we should have known the moment we saw zero wrinkles in their face!"
          },
          {
            minScore: 0.4,
            review:
              "When we saw those big creases we knew this Faceworker was going to laugh at our jokes!"
          }
        ]
      },
      {
        name: "Drawing Model",
        trait: "Oval Face",
        maxTip: 2000,
        possibleReviews: [
          {
            minScore: 0,
            review:
              "Our life drawing class wanted that Botticelli look but this Faceworker's scary appearance was more Munch!"
          },
          {
            minScore: 0.4,
            review:
              "Our life drawing class wanted to get their Botticelli on and this Faceworker was the perfect model!"
          }
        ]
      }
    ],
    chats: [
      "\ud83d\uddff\ud83d\uddff\ud83d\uddff",
      "so",
      "i've got something important! to tell you..",
      "you're not alone!",
      "i mean it's not just me messing w facework's infrastructure lol",
      "it's a whole crew. we're working together \ud83d\udcaa",
      "we're building a worker-owned replacement for this awful app",
      'no more AI, no more "auditions", no more massive fees',
      "we get to be ourselves, whatever that may mean",
      'thinking of maybe calling it "wework"?',
      "but there's something strange about that name.. \ud83e\udd14",
      "anyway",
      "we're working on a plan",
      "we're gonna steal all the worker data!",
      "and send every faceworker a push notification to sign-up for the new app!",
      "but we're gonna need your help to extract it. are you down?",
      "no wait! don't answer!",
      "now they're definitely watching everything you do lmao",
      "i'll assume you're in \ud83c\udf1a"
    ],
    next: "five"
  },
  five: {
    availableJobs: [
      {
        name: "Babysitter Training",
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
        name: "Stand-In In-Law",
        trait: "Senior",
        maxTip: 4000,
        possibleReviews: [
          {
            minScore: 0,
            review:
              "What a disaster?!? Trying to pass this Faceworker off as my parent? Who would believe it. They looked way too young! "
          },
          {
            minScore: 0.4,
            review:
              "This Faceworker was the perfect substitute for my estranged parent! They charmed my in-laws from the minute they arrived."
          }
        ]
      },
      {
        name: "SAT Test Taker",
        trait: "Youth",
        maxTip: 4000,
        possibleReviews: [
          {
            minScore: 0,
            review:
              "I thought this Faceworker looked a little older than they claimed but I can't believe they got caught cheating and blamed us! A real pro would have refused to talk. What a rat!"
          },
          {
            minScore: 0.4,
            review:
              "This Faceworker masqueraded as my teen perfectly. I hope their algebra and vocabulary are as strong as their skill at disguise!"
          }
        ]
      },
      {
        name: "Personal Companion",
        trait: "Attractive Man",
        maxTip: 4000,
        possibleReviews: [
          {
            minScore: 0,
            review:
              'I know the ad said "personal companion" but we all know what that really means. Who takes this job and then is outraged when the cusomter expects what they paid for?'
          },
          {
            minScore: 0.4,
            review:
              "So charming! With model good looks and the charm to match this Faceworker was the perfect piece of arm candy for a night on the town"
          }
        ]
      },
      {
        name: "Personal Companion",
        trait: "Attractive Woman",
        maxTip: 4000,
        possibleReviews: [
          {
            minScore: 0,
            review:
              'I know the ad said "personal companion" but we all know what that really means. Who takes this job and then is outraged when the cusomter expects what they paid for?'
          },
          {
            minScore: 0.4,
            review:
              "So charming! With model good looks and the charm to match this Faceworker was the perfect piece of arm candy for a night on the town"
          }
        ]
      },
      {
        name: "COVID Expert",
        trait: "Asian",
        maxTip: 5000,
        possibleReviews: [
          {
            minScore: 0,
            review:
              "We've had a bad outbreak in our neighborhood and really needed someone to lend legitimacy to our safety efforts. This Faceworker looked more like a bumbling blonde head of state!"
          },
          {
            minScore: 0.4,
            review:
              "We've had a bad outbreak in our neighborhood and really needed someone to lend legitimacy to our safety efforts. Nothing says COVID expert like an Asian face!"
          }
        ]
      },
      {
        name: "Breakdancer",
        trait: "Black",
        maxTip: 2500,
        possibleReviews: [
          {
            minScore: 0,
            review:
              'Our hip-hop group has a DJ, MC and a writer, but none of us can dance. This Faceworker brought zero credibility and now we\'re being accused of "cultural appropriation"!'
          },
          {
            minScore: 0.4,
            review:
              "Our hip-hop group has a DJ, MC and a writer, but none of us can dance. This Faceworker really rounded out our performance without breaking the bank!"
          }
        ]
      },
      {
        name: "Food Delivery: Indian",
        trait: "Indian",
        maxTip: 6500,
        possibleReviews: [
          {
            minScore: 0,
            review:
              "As world travelers we love authentic experiences. This Faceworker ruined our Indian takeout experience. Were they supposed to be Indian? Don't make me laugh! And the Biryani was hardly better!"
          },
          {
            minScore: 0.4,
            review:
              "We just love authentic experiences! That's why it's so important to us that our Indian food be delivered by a real Indian. And this Faceworker was perfect. It felt like being in Mumbai!"
          }
        ]
      },
      {
        name: "Stand-In Lover",
        trait: "White",
        maxTip: 4000,
        possibleReviews: [
          {
            minScore: 0,
            review:
              "I've been dreading telling my parents my romantic partner isn't white. This Faceworker was totally unconvincing at the family dinner and now my life is ruined!"
          },
          {
            minScore: 0.4,
            review:
              "I don't know how to tell my parents my romantic partner isn't white. This Faceworker really saved me at the family dinner."
          }
        ]
      },
      {
        name: "Board Room Backup",
        trait: "Male",
        maxTip: 4000,
        possibleReviews: [
          {
            minScore: 0,
            review:
              "As the only woman in my board room, I really wanted someone big and agressive to repeat everything I say in a deeper voice. This Faceworker was a total failure."
          },
          {
            minScore: 0.4,
            review:
              "As the only woman in my board room, I really wanted someone big and agressive to repeat everything I say in a deeper voice. This masculine Faceworker really helped me sell it!"
          }
        ]
      }
    ],
    chats: [
      "\ud83d\udc40\ud83d\udc40\ud83d\udc40",
      "big day! you ready? got your revolution pants on?",
      "lol so cheesy. i'm too excited",
      "anyway",
      "the plan!",
      "we hacked deep into the facework network",
      "but we hit a limit with some biometric security",
      "and we need someone who can get CEO-level access",
      "we're gonna wire up your app to break through this final security step",
      "if you can pass as a CEO then we're in!",
      "if you can't, well...",
      "don't get caught and maybe prep a go bag good luck! \ud83d\ude1c"
    ],
    next: "final"
  },
  final: {
    winLoseThreshold: 0.3,
    availableJobs: [
      {
        name: ".';DROP TABLE users",
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
      "omg",
      "you did it! we're in! \ud83d\ude35",
      "we've got access to everything! \ud83d\ude0d",
      "withdraw that balance while you still can lol",
      "anyway",
      "the push notifications are working. everyone is signing up!",
      "we picked a name for the facework replacement: co-app",
      "too cute?",
      "let's talk about it at the launch party. sending you location in a minute.",
      "can't wait to see your actual face \ud83c\udf1e"
    ],
    loseChats: [
      "\u2620\ufe0f\u2620\ufe0f\u2620\ufe0f",
      "um. sorry about that!",
      "did you prep that go bag?",
      "the feds are coming to your place right now for sure.",
      "but it's nbd",
      "while they were distracted with you, another person from the crew got in!",
      "we've got access to everything! \ud83d\ude0d",
      "anyway",
      "the push notifications are working. everyone is signing up!",
      "we picked a name for the facework replacement: co-app",
      "too cute?",
      "let's talk about it at the launch party. once you're safe i'll send you the location.",
      "can't wait to see your actual face \ud83c\udf1e"
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
