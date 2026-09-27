import { afterEach, describe, expect, it } from "vitest"

import { AUTH_ATTRIBUTE, authStateScript, SESSION_STORAGE_KEY } from "./session"

const runAuthStateScript = () => new Function(authStateScript)()

afterEach(() => {
  localStorage.clear()
  document.documentElement.removeAttribute(AUTH_ATTRIBUTE)
})

describe("authStateScript", () => {
  it("marks the document as authenticated when a session is stored", () => {
    localStorage.setItem(SESSION_STORAGE_KEY, "1")
    runAuthStateScript()

    expect(document.documentElement).toHaveAttribute(AUTH_ATTRIBUTE)
  })

  it("leaves the document unmarked without a session", () => {
    runAuthStateScript()

    expect(document.documentElement).not.toHaveAttribute(AUTH_ATTRIBUTE)
  })
})
