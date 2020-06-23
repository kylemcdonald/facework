// this file is cribbed pretty directly from https://github.com/vardius/react-user-media
import { useState, useEffect } from "preact/hooks"

export interface UserMedia {
  stream: MediaStream | null
  error: MediaStreamError | null
}

export function useUserMedia(
  constraints: MediaStreamConstraints = { audio: false, video: true }
): UserMedia {
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [error, setError] = useState<MediaStreamError | null>(null)

  useEffect(() => {
    if (stream) return
    navigator.mediaDevices.getUserMedia(constraints).then(setStream, setError)
  }, [constraints, stream, error])

  return {
    stream,
    error
  }
}
