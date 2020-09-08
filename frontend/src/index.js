import "./style/index.css"
import App from "./components/app.tsx"
import { createWorker } from "./lib/use-face-reader"

createWorker()

export default App
