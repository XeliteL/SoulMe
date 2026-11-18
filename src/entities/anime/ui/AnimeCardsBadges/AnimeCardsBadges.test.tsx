import { afterEach, describe, expect, it } from "vitest"

import AnimeCardsBadges from "./AnimeCardsBadges"

import { cleanup, render, screen } from "@testing-library/react"

const rating = { value: 8.3, reviewsCount: 21 }

afterEach(() => {
  cleanup()
})

describe("AnimeCardsBadges", () => {
  it("shows the rating of a released anime", () => {
    render(<AnimeCardsBadges status="released" rating={rating} />)

    expect(
      screen.getByRole("img", { name: "Оценка 8,3 из 10" }),
    ).toBeInTheDocument()
  })

  it("renders no rating badge for an announced anime", () => {
    const { container } = render(
      <AnimeCardsBadges status="announced" rating={rating} />,
    )

    expect(screen.queryByRole("img")).not.toBeInTheDocument()
    expect(container.querySelector(".badge")).not.toBeInTheDocument()
  })

  it("marks a favorite anime with a labelled heart", () => {
    const { container } = render(
      <AnimeCardsBadges status="released" rating={rating} isFavorite />,
    )

    expect(screen.getByText("В избранном")).toHaveClass("visually-hidden")
    expect(container.querySelector(".badge--favorite")).toBeInTheDocument()
  })

  it("does not show the heart when the anime is not a favorite", () => {
    render(<AnimeCardsBadges status="released" rating={rating} />)

    expect(screen.queryByText("В избранном")).not.toBeInTheDocument()
  })

  it("keeps the heart for an announced favorite", () => {
    const { container } = render(
      <AnimeCardsBadges status="announced" rating={rating} isFavorite />,
    )

    expect(screen.getByText("В избранном")).toBeInTheDocument()
    expect(container.querySelectorAll(".badge")).toHaveLength(1)
  })
})
