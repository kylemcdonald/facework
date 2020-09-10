import { FunctionalComponent, h } from "preact"
import { Route, Router, RouterOnChangeArgs } from "preact-router"

import Home from "../routes/home"
import NotFoundPage from "../routes/notfound"
import Versus from "../routes/versus"
import ActOne from "../routes/act-one"
import ActTwo from "../routes/act-two"
import ActThree from "../routes/act-three"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
if ((module as any).hot) {
  // tslint:disable-next-line:no-var-requires
  require("preact/debug")
}

const App: FunctionalComponent = () => {
  let currentUrl: string
  const handleRoute = (e: RouterOnChangeArgs) => {
    currentUrl = e.url
  }

  return (
    <div id="app">
      <Router onChange={handleRoute}>
        <Route path="/" component={Home} />
        <Route path="/act/1" component={ActOne} />
        <Route path="/act/2" component={ActTwo} />
        <Route path="/act/3" component={ActThree} />
        <Route path="/epilogue" component={Epilogue} />
        <Route path="/versus/" component={Versus} />
        <NotFoundPage default />
      </Router>
    </div>
  )
}

export default App
