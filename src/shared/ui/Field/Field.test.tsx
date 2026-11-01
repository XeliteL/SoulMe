import { type FormEvent } from "react"
import { afterEach, describe, expect, it, vi } from "vitest"

import Field from "./Field"

import { cleanup, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

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

  it("passes autoComplete to the control", () => {
    render(
      <>
        <Field
          label="Имя"
          name="firstname"
          placeholder=""
          autoComplete="given-name"
        />
        <Field
          label="Телефон"
          name="phone"
          placeholder=""
          mask="(000) 000-00-00"
          autoComplete="tel-national"
        />
      </>,
    )

    expect(screen.getByLabelText("Имя")).toHaveAttribute(
      "autocomplete",
      "given-name",
    )
    expect(screen.getByLabelText("Телефон")).toHaveAttribute(
      "autocomplete",
      "tel-national",
    )
  })

  it("toggles password visibility", async () => {
    const user = userEvent.setup()
    render(
      <Field label="Пароль" name="password" type="password" placeholder="" />,
    )

    const input = screen.getByLabelText("Пароль")

    expect(input).toHaveAttribute("type", "password")

    await user.click(screen.getByRole("button", { name: "Показать пароль" }))

    expect(input).toHaveAttribute("type", "text")

    await user.click(screen.getByRole("button", { name: "Скрыть пароль" }))

    expect(input).toHaveAttribute("type", "password")
  })

  it("does not submit the form when toggling password visibility", async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn((event: FormEvent) => event.preventDefault())
    render(
      <form onSubmit={onSubmit}>
        <Field label="Пароль" name="password" type="password" placeholder="" />
      </form>,
    )

    await user.click(screen.getByRole("button", { name: "Показать пароль" }))

    expect(onSubmit).not.toHaveBeenCalled()
  })

  it("passes name and defaultValue to the password input", () => {
    render(
      <Field
        label="Пароль"
        name="password"
        type="password"
        placeholder=""
        defaultValue="secret"
      />,
    )

    const input = screen.getByLabelText("Пароль")

    expect(input).toHaveAttribute("name", "password")
    expect(input).toHaveValue("secret")
  })

  it("describes the control with the hint", () => {
    render(
      <Field label="Логин" name="login" placeholder="" hint="3–20 символов" />,
    )

    expect(screen.getByLabelText("Логин")).toHaveAccessibleDescription(
      "3–20 символов",
    )
  })

  it("describes the control with the error before the hint", () => {
    render(
      <Field
        label="Логин"
        name="login"
        placeholder=""
        hint="3–20 символов"
        error="Минимум 3 символа"
      />,
    )

    const input = screen.getByLabelText("Логин")

    expect(input).toHaveAttribute("aria-invalid", "true")
    expect(input).toHaveAccessibleDescription("Минимум 3 символа 3–20 символов")
  })

  it("has no description without hint and error", () => {
    render(<Field label="Логин" name="login" placeholder="" />)

    expect(screen.getByLabelText("Логин")).not.toHaveAttribute(
      "aria-describedby",
    )
  })
})
