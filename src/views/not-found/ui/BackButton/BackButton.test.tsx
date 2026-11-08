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

describe("BackButton", () => {
  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
    back.mockReset()
    push.mockReset()
  })

  it("возвращает на предыдущую страницу, если есть история", () => {
    setHistoryLength(2)
    render(<BackButton />)

    fireEvent.click(screen.getByRole("button", { name: "вернитесь назад" }))

    expect(back).toHaveBeenCalledOnce()
    expect(push).not.toHaveBeenCalled()
  })

  it("ведёт на главную, если истории нет", () => {
    setHistoryLength(1)
    render(<BackButton />)

    fireEvent.click(screen.getByRole("button", { name: "вернитесь назад" }))

    expect(push).toHaveBeenCalledWith("/")
    expect(back).not.toHaveBeenCalled()
  })
})
