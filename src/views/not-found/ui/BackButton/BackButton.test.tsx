import { afterEach, describe, expect, it, vi } from "vitest"

import BackButton from "./BackButton"

import { cleanup, fireEvent, render, screen } from "@testing-library/react"

const { back, push } = vi.hoisted(() => ({ back: vi.fn(), push: vi.fn() }))

vi.mock("next/navigation", () => ({
  useRouter: () => ({ back, push }),
}))

const setHistoryLength = (length: number) => {
  vi.spyOn(window.history, "length", "get").mockReturnValue(length)
}

const setReferrer = (referrer: string) => {
  vi.spyOn(document, "referrer", "get").mockReturnValue(referrer)
}

const clickBack = () => {
  render(<BackButton />)
  fireEvent.click(screen.getByRole("button", { name: "вернитесь назад" }))
}

describe("BackButton", () => {
  afterEach(() => {
    cleanup()
    Reflect.deleteProperty(window, "navigation")
    vi.restoreAllMocks()
    back.mockReset()
    push.mockReset()
  })

  it("возвращает назад, если пришли со своего сайта", () => {
    setHistoryLength(2)
    setReferrer(`${window.location.origin}/anime`)

    clickBack()

    expect(back).toHaveBeenCalledOnce()
    expect(push).not.toHaveBeenCalled()
  })

  it("ведёт на главную, если пришли с чужого сайта", () => {
    setHistoryLength(2)
    setReferrer("https://example.com/")

    clickBack()

    expect(push).toHaveBeenCalledWith("/")
    expect(back).not.toHaveBeenCalled()
  })

  it("ведёт на главную, если истории нет", () => {
    setHistoryLength(1)
    setReferrer(`${window.location.origin}/anime`)

    clickBack()

    expect(push).toHaveBeenCalledWith("/")
    expect(back).not.toHaveBeenCalled()
  })

  it.each([
    [true, back],
    [false, push],
  ])(
    "с Navigation API при canGoBack = %s не смотрит на referrer",
    (canGoBack, expected) => {
      Object.defineProperty(window, "navigation", {
        configurable: true,
        value: { canGoBack },
      })
      setHistoryLength(2)
      setReferrer("https://example.com/")

      clickBack()

      expect(expected).toHaveBeenCalledOnce()
    },
  )
})
