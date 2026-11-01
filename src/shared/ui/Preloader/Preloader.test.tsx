import { usePathname } from "next/navigation"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import { dispatchNavigationStart } from "./lib/navigationStart"
import Preloader from "./Preloader"

import { act, cleanup, render } from "@testing-library/react"

vi.mock("next/navigation", () => ({ usePathname: vi.fn(() => "/") }))

const getPreloader = (container: HTMLElement) =>
  container.querySelector(".preloader")

const startNavigation = (url: string) => {
  act(() => dispatchNavigationStart(url))
  act(() => vi.advanceTimersByTime(100))
}

beforeEach(() => {
  vi.useFakeTimers()
})

afterEach(() => {
  cleanup()
  vi.useRealTimers()
  vi.restoreAllMocks()
  vi.mocked(usePathname).mockReturnValue("/")
})

describe("Preloader", () => {
  it("is visible until the page has loaded", () => {
    const readyState = vi
      .spyOn(document, "readyState", "get")
      .mockReturnValue("loading")
    const { container } = render(<Preloader />)

    expect(getPreloader(container)).not.toHaveClass("preloader--hidden")

    readyState.mockReturnValue("complete")
    act(() => window.dispatchEvent(new Event("load")))

    expect(getPreloader(container)).toHaveClass("preloader--hidden")
  })

  it("shows on navigation to another path and hides when it changes", () => {
    const { container, rerender } = render(<Preloader />)

    startNavigation("/anime")
    expect(getPreloader(container)).not.toHaveClass("preloader--hidden")

    vi.mocked(usePathname).mockReturnValue("/anime")
    rerender(<Preloader />)
    expect(getPreloader(container)).toHaveClass("preloader--hidden")
  })

  it("stays hidden on navigation within the same path", () => {
    const { container } = render(<Preloader />)

    startNavigation("/#categories")
    expect(getPreloader(container)).toHaveClass("preloader--hidden")
  })

  it("hides after the maximum duration", () => {
    const { container } = render(<Preloader />)

    startNavigation("/anime")
    act(() => vi.advanceTimersByTime(10_000))
    expect(getPreloader(container)).toHaveClass("preloader--hidden")
  })
})
