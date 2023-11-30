import { useState, useEffect } from "preact/hooks"

export interface UserMedia {
  stream: MediaStream | null
  error: MediaStreamError | null
}

function getMediaStreamConstraints(deviceId?: string): MediaStreamConstraints {
  const width = Math.min(window.innerWidth, 1280)
  return {
    audio: false,
    video: { facingMode: "user", width: width, deviceId }
  }
}

// this is a simpler version of
// https://github.com/vardius/react-user-media
export function useUserMedia(): UserMedia {
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
  useEffect(() => {
    if (stream) return

    // look for a preferred media device
    navigator.mediaDevices
      .enumerateDevices()
      .then(
        devices => {
          const deviceId = getPreferredDeviceId(devices)
          return getMediaStreamConstraints(deviceId)
        },
        () => getMediaStreamConstraints()
      )
      // then request user media
      .then(constraints => {
        navigator.mediaDevices
          .getUserMedia(constraints)
          .then(setStream, setError)
      })
  }, [])

  return {
    stream,
    error
  }
}

/**
 * If there is a "facetime" device, returns it's ID.
 * If there is an "OBS" device, returns anything else
 *
 * @param devices output from `navigator.mediaDevices.enumerateDevices()`
 */
function getPreferredDeviceId(
  devices: ReadonlyArray<MediaDeviceInfo>
): string | undefined {
  const device =
    devices.find(d => d.label === "facetime") ??
    devices.find(d => d.label !== "OBS")
  return device?.deviceId ?? undefined
}
