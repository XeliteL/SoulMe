import { afterEach, describe, expect, it, vi } from "vitest"

import ResetPasswordPage from "./ResetPasswordPage"

import { cleanup, render, screen } from "@testing-library/react"

vi.mock("@/features/auth", () => ({
  RequestResetForm: () => <form aria-label="Запрос ссылки" />,
  ResetPasswordForm: ({ token }: { token: string }) => (
    <form aria-label="Новый пароль" data-token={token} />
  ),
}))

afterEach(() => {
  cleanup()
})

const renderPage = async (searchParams: Record<string, string | string[]>) =>
  render(
    await ResetPasswordPage({
      params: Promise.resolve({}),
      searchParams: Promise.resolve(searchParams),
    }),
  )

describe("ResetPasswordPage", () => {
  it("shows the new password form for a token", async () => {
    await renderPage({ token: "reset-token" })

    expect(
      screen.getByRole("heading", { level: 1, name: "Новый пароль" }),
    ).toBeInTheDocument()
    expect(screen.getByRole("form", { name: "Новый пароль" })).toHaveAttribute(
      "data-token",
      "reset-token",
    )
    expect(
      screen.queryByRole("form", { name: "Запрос ссылки" }),
    ).not.toBeInTheDocument()
  })

  it.each([
    ["no token", {}],
    ["an empty token", { token: "" }],
    ["a repeated token", { token: ["a", "b"] }],
  ])("asks for a reset link with %s", async (_, searchParams) => {
    await renderPage(searchParams)

    expect(
      screen.getByRole("heading", { level: 1, name: "Восстановление пароля" }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole("form", { name: "Запрос ссылки" }),
    ).toBeInTheDocument()
    expect(
      screen.queryByRole("form", { name: "Новый пароль" }),
    ).not.toBeInTheDocument()
  })
})
