import { afterEach, describe, expect, it } from "vitest"

import Section from "./Section"

import { cleanup, render, screen } from "@testing-library/react"

afterEach(() => {
  cleanup()
})

describe("Section", () => {
  it("is labelled by its own heading", () => {
    render(<Section title="Популярное" />)

    const heading = screen.getByRole("heading", { name: "Популярное" })

    expect(screen.getByRole("region", { name: "Популярное" })).toHaveAttribute(
      "aria-labelledby",
      heading.id,
    )
  })

  it("generates a unique heading id for every section", () => {
    render(
      <>
        <Section title="Популярное" />
        <Section title="Новые релизы" />
      </>,
    )

    const [first, second] = screen.getAllByRole("heading")

    expect(first.id).not.toBe("")
    expect(first.id).not.toBe(second.id)
  })

  it("uses the passed titleId instead of the generated one", () => {
    render(<Section title="Популярное" titleId="popular-title" />)

    expect(screen.getByRole("heading")).toHaveAttribute("id", "popular-title")
    expect(screen.getByRole("region")).toHaveAttribute(
      "aria-labelledby",
      "popular-title",
    )
  })

  it("is not labelled when it has no title", () => {
    const { container } = render(<Section titleId="ignored" />)

    expect(container.querySelector("section")).not.toHaveAttribute(
      "aria-labelledby",
    )
    expect(screen.queryByRole("heading")).not.toBeInTheDocument()
  })

  it("prefers ariaLabelledby over its own heading", () => {
    render(
      <>
        <h1 id="page-title">Аниме</h1>
        <Section title="Популярное" ariaLabelledby="page-title" />
      </>,
    )

    expect(screen.getByRole("region", { name: "Аниме" })).toHaveAttribute(
      "aria-labelledby",
      "page-title",
    )
  })

  it("keeps the anchor id on the section", () => {
    const { container } = render(<Section title="Популярное" id="trends" />)

    expect(container.querySelector("section")).toHaveAttribute("id", "trends")
  })
})
