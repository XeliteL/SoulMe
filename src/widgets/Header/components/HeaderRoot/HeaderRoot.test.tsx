import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import HeaderRoot from "./HeaderRoot"

import { act, cleanup, fireEvent, render, screen } from "@testing-library/react"

function setScrollY(value: number) {
  Object.defineProperty(window, "scrollY", { value, configurable: true })
}

function scrollTo(value: number) {
  act(() => {
    setScrollY(value)
    fireEvent.scroll(window)
  })
}

function renderHeaderRoot() {
  const result = render(
    <HeaderRoot className="header is-fixed">
      <span>Содержимое шапки</span>
    </HeaderRoot>,
  )

  return { ...result, header: screen.getByRole("banner") }
}

beforeEach(() => {
  setScrollY(0)
})

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe("HeaderRoot", () => {
  it("renders a header with the passed class and children", () => {
    const { header } = renderHeaderRoot()

    expect(header.tagName).toBe("HEADER")
    expect(header).toHaveClass("header", "is-fixed")
    expect(screen.getByText("Содержимое шапки")).toBeInTheDocument()
  })

  it("toggles is-scrolled when the page scrolls past the top", () => {
    const { header } = renderHeaderRoot()

    expect(header).not.toHaveClass("is-scrolled")

    scrollTo(200)
    expect(header).toHaveClass("is-scrolled")

    scrollTo(0)
    expect(header).not.toHaveClass("is-scrolled")
  })

  it("keeps the passed classes while toggling is-scrolled", () => {
    const { header } = renderHeaderRoot()

    scrollTo(200)

    expect(header).toHaveClass("header", "is-fixed", "is-scrolled")
  })

  it("sets is-scrolled on mount when the page is already scrolled", () => {
    setScrollY(500)

    const { header } = renderHeaderRoot()

    expect(header).toHaveClass("is-scrolled")
  })

  it("stops listening to scroll after unmount", () => {
    const removeEventListener = vi.spyOn(window, "removeEventListener")
    const { unmount } = renderHeaderRoot()

    unmount()

    expect(removeEventListener).toHaveBeenCalledWith(
      "scroll",
      expect.any(Function),
    )
  })
})
