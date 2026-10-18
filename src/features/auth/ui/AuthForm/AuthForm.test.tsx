import { afterEach, describe, expect, it, vi } from "vitest"

import type { AuthFormState } from "../../model/types"
import AuthForm from "./AuthForm"

import { cleanup, render, screen } from "@testing-library/react"

afterEach(() => {
  cleanup()
})

const renderForm = (state: AuthFormState, invalidFields: string[] = []) => (
  <AuthForm action={vi.fn()} state={state}>
    {["Логин", "Email", "Пароль"].map((label) => (
      <input
        key={label}
        aria-label={label}
        aria-invalid={invalidFields.includes(label) || undefined}
      />
    ))}
    <button type="submit">Отправить</button>
  </AuthForm>
)

describe("AuthForm", () => {
  it("does not move focus without invalid fields", () => {
    render(renderForm({}))

    expect(document.body).toHaveFocus()
  })

  it("focuses the first invalid field after a new state", () => {
    const { rerender } = render(renderForm({}))

    rerender(renderForm({ error: "Ошибка" }, ["Email", "Пароль"]))

    expect(screen.getByLabelText("Email")).toHaveFocus()
  })

  it("focuses the invalid field again when the same error comes back", () => {
    const { rerender } = render(renderForm({}))

    rerender(renderForm({ error: "Ошибка" }, ["Пароль"]))
    screen.getByRole("button", { name: "Отправить" }).focus()
    rerender(renderForm({ error: "Ошибка" }, ["Пароль"]))

    expect(screen.getByLabelText("Пароль")).toHaveFocus()
  })
})
