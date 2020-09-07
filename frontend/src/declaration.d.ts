import { JSX } from "preact"

export = JSX
export as namespace JSX

declare module "*.wasm" {
  const content: string
  export default content
}
