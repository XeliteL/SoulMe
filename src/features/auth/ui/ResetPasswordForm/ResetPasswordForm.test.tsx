import { afterEach, describe, expect, it, vi } from "vitest"

import type { ResetPasswordState } from "../../model/types"
import ResetPasswordForm from "./ResetPasswordForm"

import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

const { resetPassword } = vi.hoisted(() => ({
  resetPassword:
    vi.fn<
      (
        prevState: ResetPasswordState,
        formData: FormData,
      ) => Promise<ResetPasswordState>
    >(),
}))

vi.mock("../../api/actions", () => ({ resetPassword }))

afterEach(() => {
  cleanup()
  resetPassword.mockReset()
})

const getPasswordField = () => screen.getByLabelText("Пароль")
const getPasswordConfirmField = () => screen.getByLabelText("Повторите пароль")

const submit = async (response: ResetPasswordState) => {
  resetPassword.mockResolvedValue(response)

  const view = render(<ResetPasswordForm token="reset-token" />)

  await userEvent.type(getPasswordField(), "secret123")
  await userEvent.type(getPasswordConfirmField(), "secret124")
  fireEvent.submit(view.container.querySelector("form")!)

  return view
}

describe("ResetPasswordForm", () => {
  it("sends the token and both passwords to the action", async () => {
    await submit({})

    await vi.waitFor(() => expect(resetPassword).toHaveBeenCalled())

    const [, formData] = resetPassword.mock.calls[0]

    expect(Object.fromEntries(formData)).toEqual({
      token: "reset-token",
      password: "secret123",
      passwordConfirm: "secret124",
    })
  })

  it("replaces the form with a sign-in link on success", async () => {
    const { container } = await submit({ success: "Пароль изменён" })

    await vi.waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent("Пароль изменён"),
    )

    expect(screen.queryByLabelText("Пароль")).not.toBeInTheDocument()
    expect(screen.queryByLabelText("Повторите пароль")).not.toBeInTheDocument()
    expect(
      screen.queryByRole("button", { name: "Сохранить пароль" }),
    ).not.toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Войти" })).toHaveAttribute(
      "href",
      "/auth",
    )
    expect(container.querySelector(".auth-form__footer")).toBeNull()
  })
})
