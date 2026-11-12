import { afterEach, describe, expect, it } from "vitest"

import ListToggle from "./ListToggle"

import { cleanup, fireEvent, render, screen } from "@testing-library/react"

afterEach(() => {
  cleanup()
})

describe("ListToggle", () => {
  it("renders an unpressed toggle with the list label", () => {
    render(<ListToggle animeId="berserk" list="bookmarks" />)

    expect(
      screen.getByRole("button", { name: "В закладки", pressed: false }),
    ).toBeInTheDocument()
  })

  it("toggles the pressed state on each click", () => {
    render(<ListToggle animeId="berserk" list="favorites" />)

    const button = screen.getByRole("button", { name: "В избранное" })

    fireEvent.click(button)
    expect(button).toHaveAttribute("aria-pressed", "true")

    fireEvent.click(button)
    expect(button).toHaveAttribute("aria-pressed", "false")
  })

  it("keeps the label when pressed", () => {
    render(<ListToggle animeId="berserk" list="bookmarks" />)

    fireEvent.click(screen.getByRole("button", { name: "В закладки" }))

    expect(
      screen.getByRole("button", { name: "В закладки", pressed: true }),
    ).toBeInTheDocument()
  })
})
