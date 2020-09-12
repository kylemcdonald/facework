import { h } from "preact"
import { ComponentChild } from "preact"

type ActsScenesIndex = {
  [act: string]: {
    scenes: ReadonlyArray<ComponentChild>
    next: string | null
    opponents?: [string]
  }
}

const index: ActsScenesIndex = {
  one: {
    scenes: [
      <>
        <p>
          Rings of Uranus tingling of the spine the sky calls to us Vangelis
          citizens of distant epochs something incredible is waiting to be
          known.
        </p>
        <p>
          Gathered by gravity a very small stage in a vast cosmic arena a very
          small stage in a vast cosmic arena Hypatia stirred by starlight rich
          in heavy atoms?
        </p>
      </>,
      <>
        <p>
          Citizens of distant epochs two ghostly white figures in coveralls and
          helmets are softly dancing Cambrian explosion vastness is bearable
          only through love invent the universe Cambrian explosion.
        </p>
      </>
    ],
    next: "two"
  },
  two: {
    scenes: [
      <>
        <p>
          Gathered by gravity the ash of stellar alchemy rogue consciousness
          worldlets hydrogen atoms.
        </p>
        <p>
          Network of wormholes emerged into consciousness are creatures of the
          cosmos inconspicuous motes of rock and gas not a sunrise but a
          galaxyrise something incredible is waiting to be known.
        </p>
      </>,
      <>
        <p>
          Emerged into consciousness descended from astronomers paroxysm of
          global death vastness is bearable only through love across the
          centuries with pretty stories for which theres little good evidence
          and billions upon billions upon billions upon billions upon billions
          upon billions upon billions.
        </p>
      </>
    ],
    next: "three"
  },
  three: {
    scenes: [
      <>
        <p>
          Billions upon billions a still more glorious dawn awaits Hypatia
          something incredible is waiting to be known as a patch of light rings
          of Uranus?
        </p>
        <p>
          Two ghostly white figures in coveralls and helmets are softly dancing
          a very small stage in a vast cosmic arena globular star cluster a mote
          of dust suspended in a sunbeam rich in heavy atoms vastness is
          bearable only through love?
        </p>
      </>,
      <>
        <p>
          Sea of Tranquility bits of moving fluff bits of moving fluff vanquish
          the impossible hydrogen atoms a mote of dust suspended in a sunbeam
          and billions upon billions upon billions upon billions upon billions
          upon billions upon billions.
        </p>
      </>
    ],
    next: null
  }
}

export default index
