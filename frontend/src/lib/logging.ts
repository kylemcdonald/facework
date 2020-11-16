import { v4 as uuidv4 } from "uuid"

export const uuid = uuidv4()
const loadTime = Date.now()

function playDuration(): number {
  return Date.now() - loadTime
}

export async function addMessage(
  collection: string,
  content: any
): Promise<void> {
  const body = {
    collection: collection,
    metadata: {
      uuid: uuid,
      playDuration: playDuration(),
      screen: [window.screen.width, window.screen.height],
      inner: [window.innerWidth, window.innerHeight],
      devicePixelRatio: window.devicePixelRatio,
      documentReferrer: window.document.referrer
    },
    content: content
  }
  if (window.location.hostname == "localhost") {
    // do not track locally
    console.debug(body)
    return
  }
  fetch("https://us-central1-facework-game.cloudfunctions.net/addMessage", {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  })
}

addMessage("session", {})
