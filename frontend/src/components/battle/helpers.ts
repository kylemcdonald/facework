import { KeyFeatureScoring } from "."
import { shouldSendFaceNow, sendFace } from "../../lib/use-face-reader"

export const sendFaceOrSchedule = (videoElement: HTMLVideoElement) => {
  const timeUntilSend = shouldSendFaceNow()
  console.log(timeUntilSend)
  if (timeUntilSend <= 0) {
    sendFace(videoElement)
  } else {
    console.debug(
      `Too soon to send video frame. Scheduling for ${timeUntilSend}ms from now.`
    )
    setTimeout(() => {
      sendFace(videoElement)
    }, timeUntilSend)
  }
}

export function isPastTimeLimit(scoring: KeyFeatureScoring): boolean {
  const { startTime, timeLimit } = scoring
  if (startTime === undefined) {
    return false
  }
  return Math.ceil((startTime + timeLimit - Date.now()) / 1000) <= 0
}
