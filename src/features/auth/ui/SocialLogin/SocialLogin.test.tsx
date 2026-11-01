import { afterEach, describe, expect, it, vi } from "vitest"

import { socialProviders } from "../../model/socialProviders"
import type { SocialLoginState } from "../../model/types"
import SocialLogin from "./SocialLogin"

import { cleanup, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

const { signInWithProvider } = vi.hoisted(() => ({
  signInWithProvider:
    vi.fn<
      (
        prevState: SocialLoginState,
        formData: FormData,
      ) => Promise<SocialLoginState>
    >(),
}))

vi.mock("../../api/actions", () => ({ signInWithProvider }))

afterEach(() => {
  cleanup()
  signInWithProvider.mockReset()
})

const getProviderButton = (label: string) =>
  screen.getByRole("button", { name: `Войти через ${label}` })

describe("SocialLogin", () => {
  it.each(socialProviders.map(({ id, label }) => [label, id]))(
    "renders a submit button for %s with value '%s'",
    (label, id) => {
      render(<SocialLogin />)

      const button = getProviderButton(label)

      expect(button).toHaveAttribute("type", "submit")
      expect(button).toHaveAttribute("name", "provider")
      expect(button).toHaveValue(id)
    },
  )

  it("sends the pressed provider to the action", async () => {
    signInWithProvider.mockResolvedValue({})
    render(<SocialLogin />)

    await userEvent.click(getProviderButton("Discord"))

    await vi.waitFor(() => expect(signInWithProvider).toHaveBeenCalled())

    const [, formData] = signInWithProvider.mock.calls[0]

    expect(formData.get("provider")).toBe("discord")
  })

  it("announces an error below the provider list", async () => {
    signInWithProvider.mockResolvedValue({
      error: "Вход через Telegram временно недоступен",
    })
    render(<SocialLogin />)

    await userEvent.click(getProviderButton("Telegram"))

    const alert = await screen.findByText(
      "Вход через Telegram временно недоступен",
    )

    expect(alert).toHaveAttribute("role", "alert")
    expect(
      screen.getByRole("list").compareDocumentPosition(alert) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy()
  })
})
