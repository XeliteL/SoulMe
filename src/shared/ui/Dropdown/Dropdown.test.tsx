import { afterEach, describe, expect, it } from "vitest"

import Dropdown from "./Dropdown"

import { cleanup, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

afterEach(() => {
  cleanup()
})

function renderDropdown() {
  render(
    <Dropdown label="Сортировка">
      <p>Подсказка</p>
      <a href="#rating">По рейтингу</a>
    </Dropdown>,
  )

  return {
    user: userEvent.setup(),
    button: screen.getByRole("button", { name: "Сортировка" }),
  }
}

describe("Dropdown", () => {
  it("toggles the panel with the button", async () => {
    const { user, button } = renderDropdown()

    expect(button).toHaveAttribute("aria-expanded", "false")
    await user.click(button)
    expect(button).toHaveAttribute("aria-expanded", "true")
    await user.click(button)
    expect(button).toHaveAttribute("aria-expanded", "false")
  })

  it("closes on a link click and returns focus, but not on plain content", async () => {
    const { user, button } = renderDropdown()

    await user.click(button)
    await user.click(screen.getByText("Подсказка"))
    expect(button).toHaveAttribute("aria-expanded", "true")

    await user.click(screen.getByRole("link", { name: "По рейтингу" }))
    expect(button).toHaveAttribute("aria-expanded", "false")
    expect(button).toHaveFocus()
  })

  it("closes on Escape and returns focus", async () => {
    const { user, button } = renderDropdown()

    await user.click(button)
    screen.getByRole("link", { name: "По рейтингу" }).focus()
    await user.keyboard("{Escape}")

    expect(button).toHaveAttribute("aria-expanded", "false")
    expect(button).toHaveFocus()
  })
})
