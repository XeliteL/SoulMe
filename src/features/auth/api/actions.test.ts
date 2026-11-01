import { describe, expect, it } from "vitest"

import { socialProviders } from "../model/socialProviders"
import {
  login,
  register,
  requestPasswordReset,
  resetPassword,
  signInWithProvider,
} from "./actions"

const createFormData = (entries: Record<string, string>) => {
  const formData = new FormData()
  Object.entries(entries).forEach(([name, value]) =>
    formData.append(name, value),
  )

  return formData
}

describe("login", () => {
  it("returns field errors and keeps the identifier", async () => {
    const state = await login({}, createFormData({ identifier: "user" }))

    expect(state.fieldErrors).toEqual({ password: "Введите пароль" })
    expect(state.values).toEqual({ identifier: "user", remember: "" })
  })

  it("keeps remember checked", async () => {
    const state = await login(
      {},
      createFormData({ identifier: "user", password: "1", remember: "on" }),
    )

    expect(state.values?.remember).toBe("on")
  })
})

describe("register", () => {
  const valid = {
    login: "soul_me",
    email: "user@example.com",
    password: "secret123",
    passwordConfirm: "secret123",
    agreement: "on",
  }

  it("returns field errors without echoing passwords", async () => {
    const state = await register(
      {},
      createFormData({ ...valid, password: "short" }),
    )

    expect(state.fieldErrors?.password).toBe("Минимум 8 символов")
    expect(state.values).toEqual({
      login: "soul_me",
      email: "user@example.com",
      agreement: "on",
    })
  })

  it("reports a missing agreement", async () => {
    const formData = createFormData(valid)
    formData.delete("agreement")
    const state = await register({}, formData)

    expect(state.fieldErrors).toEqual({
      agreement: "Необходимо принять условия",
    })
    expect(state.values?.agreement).toBe("")
  })

  it("returns a form error for valid data until the API exists", async () => {
    const state = await register({}, createFormData(valid))

    expect(state.fieldErrors).toBeUndefined()
    expect(state.error).toBe("Регистрация временно недоступна")
  })
})

describe("signInWithProvider", () => {
  it.each([
    ["an unknown provider", { provider: "myspace" }],
    ["a missing provider", {}],
  ])("rejects %s", async (_, entries) => {
    const state = await signInWithProvider({}, createFormData(entries))

    expect(state).toEqual({ error: "Неизвестный способ входа" })
  })

  it.each(socialProviders)(
    "reports that $label sign-in is unavailable",
    async ({ id, label }) => {
      const state = await signInWithProvider(
        {},
        createFormData({ provider: id }),
      )

      expect(state).toEqual({
        error: `Вход через ${label} временно недоступен`,
      })
    },
  )
})

describe("requestPasswordReset", () => {
  it("returns a field error and keeps the email", async () => {
    const state = await requestPasswordReset(
      {},
      createFormData({ email: "user@" }),
    )

    expect(state.fieldErrors).toEqual({
      email: "Некорректный адрес электронной почты",
    })
    expect(state.values).toEqual({ email: "user@" })
  })

  it("returns a form error for valid data until the API exists", async () => {
    const state = await requestPasswordReset(
      {},
      createFormData({ email: "user@example.com" }),
    )

    expect(state).toEqual({
      error: "Восстановление пароля временно недоступно",
      values: { email: "user@example.com" },
    })
  })
})

describe("resetPassword", () => {
  const valid = {
    token: "reset-token",
    password: "secret123",
    passwordConfirm: "secret123",
  }

  it("returns field errors without echoing the token or passwords", async () => {
    const state = await resetPassword(
      {},
      createFormData({ ...valid, passwordConfirm: "secret124" }),
    )

    expect(state).toEqual({
      fieldErrors: { passwordConfirm: "Пароли не совпадают" },
    })
  })

  it.each([
    [
      "a missing token",
      { password: valid.password, passwordConfirm: valid.passwordConfirm },
    ],
    ["an empty token", { ...valid, token: "" }],
    [
      "an empty token and invalid passwords",
      { ...valid, token: "", password: "short" },
    ],
  ])("returns a form error for %s", async (_, entries) => {
    const state = await resetPassword({}, createFormData(entries))

    expect(state).toEqual({ error: "Ссылка недействительна" })
  })

  it("returns a form error for valid data until the API exists", async () => {
    const state = await resetPassword({}, createFormData(valid))

    expect(state).toEqual({ error: "Смена пароля временно недоступна" })
  })
})
