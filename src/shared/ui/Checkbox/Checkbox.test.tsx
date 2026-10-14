import { afterEach, describe, expect, it } from "vitest"

import Checkbox from "./Checkbox"

import { cleanup, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

afterEach(() => {
  cleanup()
})

describe("Checkbox", () => {
  it("is labelled by its text", () => {
    render(<Checkbox name="agreement" label="Согласен" />)

    expect(
      screen.getByRole("checkbox", { name: "Согласен" }),
    ).toBeInTheDocument()
  })

  it("toggles when the label text is clicked", async () => {
    render(<Checkbox name="agreement" label="Согласен" />)

    const checkbox = screen.getByRole("checkbox")

    await userEvent.click(screen.getByText("Согласен"))
    expect(checkbox).toBeChecked()

    await userEvent.click(screen.getByText("Согласен"))
    expect(checkbox).not.toBeChecked()
  })

  it("uses the passed id instead of the generated one", () => {
    render(<Checkbox id="agreement" name="agreement" label="Согласен" />)

    expect(screen.getByRole("checkbox", { name: "Согласен" })).toHaveAttribute(
      "id",
      "agreement-checkbox",
    )
  })

  it("marks the input as required only when isRequired is set", () => {
    const { rerender } = render(<Checkbox name="agreement" label="Согласен" />)

    expect(screen.getByRole("checkbox")).not.toBeRequired()

    rerender(<Checkbox name="agreement" label="Согласен" isRequired />)

    expect(screen.getByRole("checkbox")).toBeRequired()
  })

  it("renders rich label content with links as part of the name", () => {
    render(
      <Checkbox
        name="agreement"
        label={
          <>
            Согласен с <a href="#terms">условиями</a>
          </>
        }
      />,
    )

    expect(
      screen.getByRole("checkbox", { name: "Согласен с условиями" }),
    ).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "условиями" })).toHaveAttribute(
      "href",
      "#terms",
    )
  })
})
