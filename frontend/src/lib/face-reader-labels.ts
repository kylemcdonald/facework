import { assertIsDefined } from "./assert"
import assert from "assert"

export type TraitLabel =
  | "Male"
  | "Asian"
  | "White"
  | "Black"
  | "Baby"
  | "Child"
  | "Youth"
  | "Middle Aged"
  | "Senior"
  | "Black Hair"
  | "Blond Hair"
  | "Brown Hair"
  | "Bald"
  | "No Eyewear"
  | "Eyeglasses"
  | "Sunglasses"
  | "Mustache"
  | "Smiling"
  | "Frowning"
  | "Chubby"
  | "Blurry"
  | "Harsh Lighting"
  | "Flash"
  | "Soft Lighting"
  | "Outdoor"
  | "Curly Hair"
  | "Wavy Hair"
  | "Straight Hair"
  | "Receding Hairline"
  | "Bangs"
  | "Sideburns"
  | "Fully Visible Forehead"
  | "Partially Visible Forehead"
  | "Obstructed Forehead"
  | "Bushy Eyebrows"
  | "Arched Eyebrows"
  | "Narrow Eyes"
  | "Eyes Open"
  | "Big Nose"
  | "Pointy Nose"
  | "Big Lips"
  | "Mouth Closed"
  | "Mouth Slightly Open"
  | "Mouth Wide Open"
  | "Teeth Not Visible"
  | "No Beard"
  | "Goatee"
  | "Round Jaw"
  | "Double Chin"
  | "Wearing Hat"
  | "Oval Face"
  | "Square Face"
  | "Round Face"
  | "Color Photo"
  | "Posed Photo"
  | "Attractive Man"
  | "Attractive Woman"
  | "Indian"
  | "Gray Hair"
  | "Bags Under Eyes"
  | "Heavy Makeup"
  | "Rosy Cheeks"
  | "Shiny Skin"
  | "Pale Skin"
  | "5 o Clock Shadow"
  | "Strong Nose-Mouth Lines"
  | "Wearing Lipstick"
  | "Flushed Face"
  | "High Cheekbones"
  | "Brown Eyes"
  | "Wearing Earrings"
  | "Wearing Necktie"
  | "Wearing Necklace"
  | "CEO"
  | "Police"
  | "Wearing Mask"

const faceReaderLabels: ReadonlySet<TraitLabel> = new Set<TraitLabel>([
  "Male",
  "Asian",
  "White",
  "Black",
  "Baby",
  "Child",
  "Youth",
  "Middle Aged",
  "Senior",
  "Black Hair",
  "Blond Hair",
  "Brown Hair",
  "Bald",
  "No Eyewear",
  "Eyeglasses",
  "Sunglasses",
  "Mustache",
  "Smiling",
  "Frowning",
  "Chubby",
  "Blurry",
  "Harsh Lighting",
  "Flash",
  "Soft Lighting",
  "Outdoor",
  "Curly Hair",
  "Wavy Hair",
  "Straight Hair",
  "Receding Hairline",
  "Bangs",
  "Sideburns",
  "Fully Visible Forehead",
  "Partially Visible Forehead",
  "Obstructed Forehead",
  "Bushy Eyebrows",
  "Arched Eyebrows",
  "Narrow Eyes",
  "Eyes Open",
  "Big Nose",
  "Pointy Nose",
  "Big Lips",
  "Mouth Closed",
  "Mouth Slightly Open",
  "Mouth Wide Open",
  "Teeth Not Visible",
  "No Beard",
  "Goatee",
  "Round Jaw",
  "Double Chin",
  "Wearing Hat",
  "Oval Face",
  "Square Face",
  "Round Face",
  "Color Photo",
  "Posed Photo",
  "Attractive Man",
  "Attractive Woman",
  "Indian",
  "Gray Hair",
  "Bags Under Eyes",
  "Heavy Makeup",
  "Rosy Cheeks",
  "Shiny Skin",
  "Pale Skin",
  "5 o Clock Shadow",
  "Strong Nose-Mouth Lines",
  "Wearing Lipstick",
  "Flushed Face",
  "High Cheekbones",
  "Brown Eyes",
  "Wearing Earrings",
  "Wearing Necktie",
  "Wearing Necklace",
  "CEO",
  "Police",
  "Wearing Mask"
])

export function isTraitLabel(
  someString: string | undefined | null
): someString is TraitLabel {
  try {
    assertIsDefined(someString)
    assert(faceReaderLabels.has(someString as TraitLabel))
    return true
  } catch {
    return false
  }
}

export function getRandomTraitLabel(): TraitLabel {
  const labelsArray = Array.from(faceReaderLabels)
  return labelsArray[Math.floor(Math.random() * labelsArray.length)]
}

/** Returns caricature image path for a given trait */
export function getCaricaturePath(traitLabel: TraitLabel): string {
  return `/assets/images/caricatures/${traitLabel}.jpg`
}

export default faceReaderLabels
