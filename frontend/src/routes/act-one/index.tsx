import { FunctionalComponent, h } from "preact"
import { Link } from "preact-router"
import Exposition from "../../components/exposition"

const ActOne: FunctionalComponent = () => {
  return (
    <Exposition>
      <p>
        Rings of Uranus tingling of the spine the sky calls to us Vangelis
        citizens of distant epochs something incredible is waiting to be known.
        Gathered by gravity a very small stage in a vast cosmic arena a very
        small stage in a vast cosmic arena Hypatia stirred by starlight rich in
        heavy atoms?
      </p>
      <p>
        Citizens of distant epochs two ghostly white figures in coveralls and
        helmets are softly dancing Cambrian explosion vastness is bearable only
        through love invent the universe Cambrian explosion.
      </p>
      <Link href="/versus">Next</Link>
    </Exposition>
  )
}

export default ActOne
