import { FunctionalComponent, h } from "preact"
import { Route, Router, RouterOnChangeArgs, Link } from "preact-router"
import { Provider } from "react-redux"

import Welcome from "../routes/welcome"
import ChooseJob from "../routes/choose-job"
import DoJob from "../routes/do-job"
import Epilogue from "../routes/epilogue"
import NotFoundPage from "../routes/notfound"
import AutoAdvanceExample from "../routes/examples/auto-advance-button"
import ChatPage from "../routes/chat"
import JobSummary from "../routes/job-summary"
import { store } from "../lib/store"
import CameraError from "../routes/camera-error"
import { ReloadLink } from "./reload-link"

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
          <Route path="/" component={Welcome} />
          <Route path="/error" component={CameraError} />
          <Route path="/choose" component={ChooseJob} />
          <Route path="/versus" component={DoJob} />
          <Route path="/job-summary" component={JobSummary} />
          <Route path="/epilogue" component={Epilogue} />
          {/* component example routes */}
          <Route
            path="/example/auto-advance-button"
            component={AutoAdvanceExample}
          />
          <Route path="/example/reload-link" component={ReloadLink} />
          {/* end example routes */}
          <NotFoundPage default />
        </Router>
      </Provider>
    </div>
  )
}

export default App
