import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import HeaderScrollRuntime from "./HeaderScrollRuntime"

import { cleanup, fireEvent, render } from "@testing-library/react"

function setScrollY(value: number) {
  Object.defineProperty(window, "scrollY", { value, configurable: true })
}

function renderHeader() {
  const result = render(
    <header className="header">
      <HeaderScrollRuntime />
    </header>,
  )

  return {
    ...result,
    header: result.container.querySelector<HTMLElement>(".header")!,
  }
}

function scrollTo(value: number) {
  setScrollY(value)
  fireEvent.scroll(window)
}

beforeEach(() => {
  setScrollY(0)
})

afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
})

describe("HeaderScrollRuntime", () => {
  describe("when scroll-driven animations are supported", () => {
    beforeEach(() => {
      vi.stubGlobal("CSS", { supports: () => true })
    })

    it("does not toggle the class", () => {
      const { header } = renderHeader()

      scrollTo(200)

      expect(header).not.toHaveClass("is-scrolled")
    })
  })

  describe("when scroll-driven animations are not supported", () => {
    beforeEach(() => {
      vi.stubGlobal("CSS", { supports: () => false })
    })

    it("toggles the class on scroll", () => {
      const { header } = renderHeader()

      expect(header).not.toHaveClass("is-scrolled")

      scrollTo(200)
      expect(header).toHaveClass("is-scrolled")

      scrollTo(0)
      expect(header).not.toHaveClass("is-scrolled")
    })

    it("sets the class on mount when the page is already scrolled", () => {
      setScrollY(500)

      const { header } = renderHeader()

      expect(header).toHaveClass("is-scrolled")
    })

    it("stops listening after unmount", () => {
      const { header, unmount } = renderHeader()

      unmount()
      scrollTo(200)

      expect(header).not.toHaveClass("is-scrolled")
    })
  })
})
