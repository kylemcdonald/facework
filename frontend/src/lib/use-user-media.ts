import { useState, useEffect } from "preact/hooks"

export interface UserMedia {
  stream: MediaStream | null
  error: MediaStreamError | null
}

function defaultMediaStreamConstraints(): MediaStreamConstraints {
  const width = Math.min(window.innerWidth, 1280)
  return {
    audio: false,
    video: { facingMode: "user", width: width }
  }
}

// this is a simpler version of
// https://github.com/vardius/react-user-media
export function useUserMedia(constraints?: MediaStreamConstraints): UserMedia {
  // manual browser detection for edge cases
  const ua = navigator.userAgent
  const isiOS = ua.includes("iPhone") || ua.includes("iPad")
  const isApp =
    ua.includes("Instagram") || // instagram mobile app
    ua.includes("LightSpeed") || // facebook messenger app
    ua.includes("CriOS") // chrome
  if (isiOS && isApp) {
    return {
      stream: null,
      error: {
        constraintName: "browser",
        name: "browser",
        message:
          "Please use Safari. Camera access is not supported by this browser."
      }
    }
  }

  const [stream, setStream] = useState<MediaStream | null>(null)
  const [error, setError] = useState<MediaStreamError | null>(null)
  const constraintsToUse = constraints ?? defaultMediaStreamConstraints()
  useEffect(() => {
    if (stream) return
    navigator.mediaDevices
      .getUserMedia(constraintsToUse)
      .then(setStream, setError)
  }, [constraintsToUse, stream, error])

  return {
    stream,
    error
  }
}
