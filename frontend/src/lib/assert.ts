import { AssertionError } from "assert"

/** Asserts that something isn't an array */
export function assertIsNotArray<T>(
  val: T | T[],
  name = "something"
): asserts val is T {
  if (Array.isArray(val)) {
    throw new AssertionError({
      message: `Expected ${name} to NOT be an array, but received ${val}`
    })
  }
}

/** Asserts that something is defined */
export function assertIsDefined<T>(
  val: T,
  message?: string
): asserts val is NonNullable<T> {
  if (val === undefined || val === null) {
    throw new AssertionError({
      message:
        message || `Expected something to be defined, but received ${val}`
    })
  }
}
