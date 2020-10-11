import { FunctionalComponent, h } from "preact"
import { Route, Router, RouterOnChangeArgs } from "preact-router"
import { Provider } from "react-redux"

import Home from "../routes/home"
import Choose from "../routes/choose"
import Versus from "../routes/versus"
import Epilogue from "../routes/epilogue"
import NotFoundPage from "../routes/notfound"
import AutoAdvanceExample from "../routes/examples/auto-advance-button"
import ChatPage from "../routes/chat"
import JobSummary from "../routes/job-summary"
import { store } from "../lib/store"

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
      <Provider store={store}>
        <Router onChange={handleRoute}>
          <Route path="/" component={Home} />
          <Route path="/choose" component={Choose} />
          <Route path="/versus" component={Versus} />
          <Route path="/epilogue" component={Epilogue} />
          <Route path="/chat" component={ChatPage} />
          <Route path="/job-summary" component={JobSummary} />
          <Route
            path="/example/auto-advance-button"
            component={AutoAdvanceExample}
          />
          <NotFoundPage default />
        </Router>
      </Provider>
    </div>
  )
}

export default App
