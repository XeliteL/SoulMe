import { afterEach, describe, expect, it } from "vitest"

import Badge from "./Badge"

import { cleanup, render, screen } from "@testing-library/react"

afterEach(() => {
  cleanup()
})

describe("Badge", () => {
  it("reads the icon label before the value", () => {
    const { container } = render(
      <Badge iconName="duration" iconLabel="Длительность">
        24 серии
      </Badge>,
    )

    expect(container).toHaveTextContent("Длительность: 24 серии")
    expect(screen.getByText("Длительность:")).toHaveClass("visually-hidden")
  })

  it("does not render a hidden label when iconLabel is not set", () => {
    const { container } = render(<Badge iconName="views">1,2 тыс.</Badge>)

    expect(container).toHaveTextContent(/^1,2 тыс\.$/)
    expect(container.querySelector(".visually-hidden")).not.toBeInTheDocument()
  })

  it("hides the icon from assistive technology", () => {
    const { container } = render(
      <Badge iconName="views" iconLabel="Количество просмотров">
        1,2 тыс.
      </Badge>,
    )

    expect(container.querySelector(".badge__icon")).toHaveAttribute(
      "aria-hidden",
      "true",
    )
  })

  it("renders without an icon", () => {
    const { container } = render(<Badge>Топ 10</Badge>)

    expect(container.querySelector(".badge__icon")).not.toBeInTheDocument()
    expect(container).toHaveTextContent("Топ 10")
  })
})
