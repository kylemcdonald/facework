import { useState, useEffect } from "preact/hooks"

export interface UserMedia {
  stream: MediaStream | null
  error: MediaStreamError | null
}

function defaultMediaStreamConstraints(): MediaStreamConstraints {
  const base = {
    audio: false,
    video: { facingMode: "user" }
  }
  if (window) {
    return {
      ...base,
      video: {
        facingMode: "user",
        width: window.innerWidth
      }
    }
  }
  return base
}

// this is a simpler version of
// https://github.com/vardius/react-user-media
export function useUserMedia(constraints?: MediaStreamConstraints): UserMedia {
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [error, setError] = useState<MediaStreamError | null>(null)
  const constraintsToUse = constraints || defaultMediaStreamConstraints()
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
