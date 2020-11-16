import browser from "browser-detect"

type ErrorExplanation = {
  readonly name: string
  readonly mobile: boolean
  readonly text: string
}

const instructions: ErrorExplanation[] = [
  {
    name: "chrome",
    mobile: false,
    text:
      'In Chrome for desktop, click the camera icon on the right side of the address bar and select "Always Allow". Or click the "Info" button on the left side of the address bar and change the Camera dropdown from "Block" to "Allow".'
  },
  {
    name: "safari",
    mobile: false,
    text:
      'In Safari for desktop, refresh the page and click "Allow" on the pop-up. If there is no pop-up, open Safari Preferences and select the "Websites" tab. Then click "Camera" and change the facework.app dropdown from "Deny" to "Allow".'
  },
  {
    name: "safari",
    mobile: true,
    text:
      'In Safari for mobile, refresh the page and click "Allow" on the pop-up.'
  }
]

export function explainError(): string {
  const current = browser()
  const properties = ["name", "mobile"]
  const valid = instructions.filter(reference => {
    return reference.mobile == current.mobile && reference.name == current.name
  })
  return valid.length > 0 ? valid[0].text : ""
}
