import { afterEach, describe, expect, it } from "vitest"

import AnimeListToggle from "./AnimeListToggle"

import { cleanup, fireEvent, render, screen } from "@testing-library/react"

afterEach(() => {
  cleanup()
})

describe("AnimeListToggle", () => {
  it("renders an unpressed toggle with the list label", () => {
    render(<AnimeListToggle animeId="berserk" list="bookmarks" />)

    expect(
      screen.getByRole("button", { name: "В закладки", pressed: false }),
    ).toBeInTheDocument()
  })

  it("toggles the pressed state on each click", () => {
    render(<AnimeListToggle animeId="berserk" list="favorites" />)

    const button = screen.getByRole("button", { name: "В избранное" })

    fireEvent.click(button)
    expect(button).toHaveAttribute("aria-pressed", "true")

    fireEvent.click(button)
    expect(button).toHaveAttribute("aria-pressed", "false")
  })

  it("keeps the label when pressed", () => {
    render(<AnimeListToggle animeId="berserk" list="bookmarks" />)

    fireEvent.click(screen.getByRole("button", { name: "В закладки" }))

    expect(
      screen.getByRole("button", { name: "В закладки", pressed: true }),
    ).toBeInTheDocument()
  })
})
