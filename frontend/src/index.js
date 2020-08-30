import "./style/index.css"
import App from "./components/app.tsx"
import { createWorker } from "./lib/face-reader-worker-relay"

createWorker()

export default App
