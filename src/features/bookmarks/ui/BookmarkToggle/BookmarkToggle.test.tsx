import { afterEach, describe, expect, it } from "vitest"

import BookmarkToggle from "./BookmarkToggle"

import { cleanup, fireEvent, render, screen } from "@testing-library/react"

afterEach(() => {
  cleanup()
})

describe("BookmarkToggle", () => {
  it("renders an unpressed toggle with the view label", () => {
    render(<BookmarkToggle animeId="berserk" view="bookmarks" />)

    expect(
      screen.getByRole("button", { name: "В закладках", pressed: false }),
    ).toBeInTheDocument()
  })

  it("toggles the pressed state on each click", () => {
    render(<BookmarkToggle animeId="berserk" view="favorite" />)

    const button = screen.getByRole("button", { name: "Любимые" })

    fireEvent.click(button)
    expect(button).toHaveAttribute("aria-pressed", "true")

    fireEvent.click(button)
    expect(button).toHaveAttribute("aria-pressed", "false")
  })

  it("keeps the label when pressed", () => {
    render(<BookmarkToggle animeId="berserk" view="bookmarks" />)

    fireEvent.click(screen.getByRole("button", { name: "В закладках" }))

    expect(
      screen.getByRole("button", { name: "В закладках", pressed: true }),
    ).toBeInTheDocument()
  })
})
