import { afterEach, describe, expect, it, vi } from "vitest"

import type { ResetRequestState } from "../../model/types"
import RequestResetForm from "./RequestResetForm"

import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

const { requestPasswordReset } = vi.hoisted(() => ({
  requestPasswordReset:
    vi.fn<
      (
        prevState: ResetRequestState,
        formData: FormData,
      ) => Promise<ResetRequestState>
    >(),
}))

vi.mock("../../api/actions", () => ({ requestPasswordReset }))

afterEach(() => {
  cleanup()
  requestPasswordReset.mockReset()
})

const getEmailField = () =>
  screen.getByRole("textbox", { name: "Введите email, привязанный к аккаунту" })

const submit = async (email: string, response: ResetRequestState) => {
  requestPasswordReset.mockResolvedValue(response)

  const { container } = render(<RequestResetForm />)

  await userEvent.type(getEmailField(), email)
  fireEvent.submit(container.querySelector("form")!)
}

describe("RequestResetForm", () => {
  it("sends the email to the action", async () => {
    await submit("user@example.com", {})

    await vi.waitFor(() => expect(requestPasswordReset).toHaveBeenCalled())

    const [, formData] = requestPasswordReset.mock.calls[0]

    expect(formData.get("email")).toBe("user@example.com")
  })

  it("shows a field error and keeps the entered email", async () => {
    await submit("user@", {
      fieldErrors: { email: "Некорректный адрес электронной почты" },
      values: { email: "user@" },
    })

    await vi.waitFor(() =>
      expect(getEmailField()).toHaveAttribute("aria-invalid", "true"),
    )

    expect(getEmailField()).toHaveValue("user@")
  })

  it("announces success and clears the field", async () => {
    await submit("user@example.com", {
      success: "Если аккаунт есть, мы отправили письмо",
    })

    await vi.waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent(
        "Если аккаунт есть, мы отправили письмо",
      ),
    )

    expect(getEmailField()).toHaveValue("")
  })
})
