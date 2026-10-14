import { afterEach, describe, expect, it } from "vitest"

import Field from "./Field"

import { cleanup, render, screen } from "@testing-library/react"

const PHONE_MASK = "(000) 000-00-00"

afterEach(() => {
  cleanup()
})

describe("Field", () => {
  it.each([
    ["input", {}, "INPUT"],
    ["textarea", { type: "textarea" as const }, "TEXTAREA"],
    ["masked input", { mask: PHONE_MASK }, "INPUT"],
  ])("labels the %s and passes its name", (_, props, tagName) => {
    render(<Field label="Поле" name="field" placeholder="" {...props} />)

    const control = screen.getByLabelText("Поле")

    expect(control.tagName).toBe(tagName)
    expect(control).toHaveAttribute("name", "field")
  })

  it("does not pass input-only attributes to the textarea", () => {
    render(
      <Field
        label="Сообщение"
        name="message"
        type="textarea"
        placeholder=""
        inputMode="tel"
      />,
    )

    const textarea = screen.getByLabelText("Сообщение")

    expect(textarea).not.toHaveAttribute("type")
    expect(textarea).not.toHaveAttribute("inputmode")
  })

  it("passes type and inputMode to the input", () => {
    render(
      <>
        <Field label="Email" name="email" type="email" placeholder="" />
        <Field label="Телефон" name="phone" inputMode="tel" placeholder="" />
      </>,
    )

    expect(screen.getByLabelText("Email")).toHaveAttribute("type", "email")
    expect(screen.getByLabelText("Телефон")).toHaveAttribute("inputmode", "tel")
  })

  it("marks the control as required only when isRequired is set", () => {
    const { rerender } = render(
      <Field label="Имя" name="firstName" placeholder="" />,
    )

    expect(screen.getByRole("textbox")).not.toBeRequired()

    rerender(<Field label="Имя" name="firstName" placeholder="" isRequired />)

    expect(screen.getByRole("textbox")).toBeRequired()
    expect(screen.getByText("*")).toHaveAttribute("aria-hidden", "true")
    expect(screen.getByRole("textbox", { name: "Имя" })).toBeInTheDocument()
  })
})
