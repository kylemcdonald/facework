import { FunctionalComponent, h } from "preact"
import { Route, Router, RouterOnChangeArgs } from "preact-router"

import Home from "../routes/home"
import NotFoundPage from "../routes/notfound"
import Versus from "../routes/versus"
import ActScene from "../routes/act-scene"
import Epilogue from "../routes/epilogue"

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
        <Route path="/act/:id/:sceneId?" component={ActScene} />
        <Route path="/epilogue" component={Epilogue} />
        <Route path="/versus/" component={Versus} />
        <NotFoundPage default />
      </Router>
    </div>
  )
}

export default App
