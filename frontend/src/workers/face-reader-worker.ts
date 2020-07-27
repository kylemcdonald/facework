const ctx: Worker = self as any

ctx.addEventListener("message", e => console.debug(e))
