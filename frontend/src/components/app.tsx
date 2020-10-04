import { FunctionalComponent, h } from "preact"
import { Route, Router, RouterOnChangeArgs } from "preact-router"

import Home from "../routes/home"
import ActScene from "../routes/act-scene"
import Choose from "../routes/choose"
import Versus from "../routes/versus"
import Epilogue from "../routes/epilogue"
import NotFoundPage from "../routes/notfound"
import AutoAdvanceExample from "../routes/examples/auto-advance-button"
import ChatPage from "../routes/chat"
import JobSummary from "../routes/job-summary"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
if ((module as any).hot) {
  // tslint:disable-next-line:no-var-requires
  require("preact/debug")
}

const App: FunctionalComponent = () => {
  let currentUrl: string
  const handleRoute = (e: RouterOnChangeArgs): void => {
    currentUrl = e.url
  }

  return (
    <div id="app">
      <Router onChange={handleRoute}>
        <Route path="/" component={Home} />
        <Route path="/act/:actId/choose" component={Choose} />
        <Route path="/act/:actId/versus/:trait?" component={Versus} />
        <Route path="/act/:actId/:sceneId?" component={ActScene} />
        <Route path="/epilogue" component={Epilogue} />
        <Route path="/chat" component={ChatPage} />
        <Route path="/job-summary" component={JobSummary} />
        <Route
          path="/example/auto-advance-button"
          component={AutoAdvanceExample}
        />
        <NotFoundPage default />
      </Router>
    </div>
  )
}

export default App
