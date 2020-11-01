import "./style/index.css"
import App from "./components/app.tsx"
import { createWorker, initWorker } from "./lib/use-face-reader"

createWorker()
initWorker()

export default App
