import { afterEach, beforeEach, describe, expect, it } from "vitest"

import GrayFavicon from "./GrayFavicon"

import { cleanup, render } from "@testing-library/react"

const FAVICONS = [
  "/favicon.ico",
  "/favicon-32x32.png",
  "/favicon-16x16.png",
] as const

const setHidden = (isHidden: boolean) => {
  Object.defineProperty(document, "hidden", {
    configurable: true,
    get: () => isHidden,
  })
  document.dispatchEvent(new Event("visibilitychange"))
}

const getFaviconHrefs = () =>
  [...document.querySelectorAll('link[rel="icon"]')].map((link) =>
    link.getAttribute("href"),
  )

beforeEach(() => {
  FAVICONS.forEach((href) => {
    document.head.insertAdjacentHTML(
      "beforeend",
      `<link rel="icon" href="${href}">`,
    )
  })
})

afterEach(() => {
  cleanup()
  document.head.innerHTML = ""
  Reflect.deleteProperty(document, "hidden")
})

describe("GrayFavicon", () => {
  it("grays out every favicon size when the tab is hidden", () => {
    render(<GrayFavicon />)

    setHidden(true)

    expect(getFaviconHrefs()).toEqual([
      "/favicon_grayed.ico",
      "/favicon-32x32_grayed.png",
      "/favicon-16x16_grayed.png",
    ])
  })

  it("restores the original favicons when the tab is visible again", () => {
    render(<GrayFavicon />)

    setHidden(true)
    setHidden(false)

    expect(getFaviconHrefs()).toEqual([...FAVICONS])
  })

  it("does not stack the suffix on repeated hiding", () => {
    render(<GrayFavicon />)

    setHidden(true)
    setHidden(true)

    expect(getFaviconHrefs()[0]).toBe("/favicon_grayed.ico")
  })

  it("picks up favicons replaced after mount", () => {
    render(<GrayFavicon />)

    document.head.innerHTML = '<link rel="icon" href="/favicon.ico">'
    setHidden(true)

    expect(getFaviconHrefs()).toEqual(["/favicon_grayed.ico"])
  })

  it("stops listening after unmount", () => {
    const { unmount } = render(<GrayFavicon />)

    unmount()
    setHidden(true)

    expect(getFaviconHrefs()).toEqual([...FAVICONS])
  })
})
