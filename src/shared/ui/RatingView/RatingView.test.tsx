import { afterEach, describe, expect, it } from "vitest"

import RatingView from "./RatingView"

import { cleanup, render, screen } from "@testing-library/react"

afterEach(() => {
  cleanup()
})

describe("RatingView", () => {
  it("shows the grade out of ten with the reviews count", () => {
    render(<RatingView value={8.3} reviewsCount={21} />)

    const rating = screen.getByRole("img", { name: "Оценка 8,3 из 10" })

    expect(rating).toHaveTextContent("8,3")
    expect(rating).toHaveAttribute("title", "Оценка на основе 21 отзыва")
    expect(rating.style.getPropertyValue("--ratingViewValue")).toBe("8.3")
  })

  it("shows the user grade without reviews", () => {
    render(<RatingView type="user" value={8} />)

    const rating = screen.getByRole("img", { name: "Ваша оценка 8,0" })

    expect(rating).toHaveAttribute("title", "Ваша оценка")
    expect(rating.querySelector(".rating-view__star-user")).toBeInTheDocument()
  })
})
