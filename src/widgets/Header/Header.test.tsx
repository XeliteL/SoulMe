import { usePathname } from "next/navigation"
import { afterEach, describe, expect, it, vi } from "vitest"

import Header from "./Header"

import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react"
import userEvent from "@testing-library/user-event"

vi.mock("next/navigation", () => ({ usePathname: vi.fn(() => "/") }))

afterEach(() => {
  cleanup()
  document.documentElement.classList.remove("is-lock")
})

describe("Header", () => {
  it("marks the nav link matching the current pathname as active", () => {
    vi.mocked(usePathname).mockReturnValue("/anime")
    render(<Header />)
    const nav = screen.getByRole("navigation", { hidden: true })

    expect(
      within(nav).getByRole("link", { name: "Аниме", hidden: true }),
    ).toHaveClass("is-active")
    expect(
      within(nav).getByRole("link", { name: "Главная", hidden: true }),
    ).not.toHaveClass("is-active")
  })

  it("marks no link active on a page outside the navigation", () => {
    vi.mocked(usePathname).mockReturnValue("/terms")
    render(<Header />)
    const nav = screen.getByRole("navigation", { hidden: true })

    for (const link of within(nav).getAllByRole("link", { hidden: true })) {
      expect(link).not.toHaveClass("is-active")
    }
  })

  it("opens and closes the overlay menu via the burger button", async () => {
    const user = userEvent.setup()
    render(<Header />)

    const dialog = document.getElementById("header-menu") as HTMLDialogElement

    await user.click(screen.getByRole("button", { name: "Открыть меню" }))

    expect(dialog.open).toBe(true)
    expect(document.documentElement).toHaveClass("is-lock")

    await user.click(screen.getByRole("button", { name: "Закрыть меню" }))

    expect(document.documentElement).not.toHaveClass("is-lock")
    expect(dialog.open).toBe(true)

    fireEvent.transitionEnd(dialog)

    expect(dialog.open).toBe(false)
  })

  it("renders the search, notifications and account actions", () => {
    render(<Header />)

    expect(screen.getByRole("button", { name: "Поиск" })).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: "Уведомления" }),
    ).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Вы" })).toBeInTheDocument()
  })
})
