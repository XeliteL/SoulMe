import { describe, expect, it } from "vitest"
import { z } from "zod"

import { getFieldErrors } from "./getFieldErrors"
import {
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  resetRequestSchema,
} from "./validation"

const validLogin = {
  identifier: "user",
  password: "1",
  remember: null,
}

const validRegister = {
  login: "soul_me",
  email: "user@example.com",
  password: "secret123",
  passwordConfirm: "secret123",
  agreement: "on",
}

const validResetPassword = {
  token: "reset-token",
  password: "secret123",
  passwordConfirm: "secret123",
}

const createGetErrors =
  (schema: z.ZodType, valid: Record<string, unknown>) =>
  (data: Record<string, unknown>) => {
    const parsed = schema.safeParse({ ...valid, ...data })

    return parsed.success ? {} : getFieldErrors(parsed.error)
  }

const getLoginErrors = createGetErrors(loginSchema, validLogin)
const getRegisterErrors = createGetErrors(registerSchema, validRegister)
const getResetRequestErrors = createGetErrors(resetRequestSchema, {
  email: "user@example.com",
})
const getResetPasswordErrors = createGetErrors(
  resetPasswordSchema,
  validResetPassword,
)

describe("loginSchema", () => {
  it.each([
    ["on", true],
    [null, false],
  ])("parses remember '%s' as %s", (remember, expected) => {
    const parsed = loginSchema.parse({ ...validLogin, remember })

    expect(parsed.remember).toBe(expected)
  })

  it.each([
    ["   ", "Введите логин или email"],
    ["a".repeat(255), "Максимум 254 символа"],
  ])("rejects identifier %j with '%s'", (identifier, message) => {
    expect(getLoginErrors({ identifier }).identifier).toBe(message)
  })

  it("accepts a 254-character identifier", () => {
    expect(getLoginErrors({ identifier: "a".repeat(254) })).toEqual({})
  })

  it.each([
    ["", "Введите пароль"],
    ["a".repeat(65), "Максимум 64 символа"],
  ])("rejects password %j with '%s'", (password, message) => {
    expect(getLoginErrors({ password }).password).toBe(message)
  })

  it("does not check the password format", () => {
    expect(getLoginErrors({ password: "пароль" })).toEqual({})
  })
})

describe("registerSchema", () => {
  it("accepts valid data and normalizes email", () => {
    const parsed = registerSchema.parse({
      ...validRegister,
      email: " User@Example.COM ",
    })

    expect(parsed.email).toBe("user@example.com")
    expect(parsed.agreement).toBe("on")
  })

  it.each([
    [null, "Введите логин"],
    ["", "Введите логин"],
    ["ab", "Минимум 3 символа"],
    ["a".repeat(21), "Максимум 20 символов"],
    ["логин", "Только латинские буквы, цифры, «-» и «_»"],
    ["-soul", "Должен начинаться и заканчиваться буквой или цифрой"],
    ["soul_", "Должен начинаться и заканчиваться буквой или цифрой"],
  ])("rejects login %j with '%s'", (login, message) => {
    expect(getRegisterErrors({ login }).login).toBe(message)
  })

  it.each([
    [null, "Введите email"],
    ["", "Введите email"],
    ["   ", "Введите email"],
    ["user@", "Некорректный адрес электронной почты"],
    [`${"a".repeat(243)}@example.com`, "Максимум 254 символа"],
  ])("rejects email %j with '%s'", (email, message) => {
    expect(getRegisterErrors({ email }).email).toBe(message)
  })

  it.each([
    ["", "Введите пароль"],
    ["a1", "Минимум 8 символов"],
    ["a1".repeat(33), "Максимум 64 символа"],
    ["пароль123", "Только латинские буквы, цифры и символы"],
    ["secret 123", "Только латинские буквы, цифры и символы"],
    ["12345678", "Хотя бы одна латинская буква"],
    ["password", "Хотя бы одна цифра"],
  ])("rejects password %j with '%s'", (password, message) => {
    expect(
      getRegisterErrors({ password, passwordConfirm: password }).password,
    ).toBe(message)
  })

  it("accepts symbols in the password", () => {
    const password = "s3cret!@#$%^&*()_+-=[]{}~"

    expect(getRegisterErrors({ password, passwordConfirm: password })).toEqual(
      {},
    )
  })

  it("rejects mismatched passwords", () => {
    expect(
      getRegisterErrors({ passwordConfirm: "secret124" }).passwordConfirm,
    ).toBe("Пароли не совпадают")
  })

  it("skips the mismatch error while the password itself is invalid", () => {
    expect(
      getRegisterErrors({ password: "short", passwordConfirm: "other" }),
    ).not.toHaveProperty("passwordConfirm")
  })

  it("checks the mismatch even when other fields are invalid", () => {
    const errors = getRegisterErrors({
      agreement: null,
      passwordConfirm: "secret124",
    })

    expect(errors.passwordConfirm).toBe("Пароли не совпадают")
  })

  it("requires the agreement", () => {
    expect(getRegisterErrors({ agreement: null }).agreement).toBe(
      "Необходимо принять условия",
    )
  })
})

describe("resetRequestSchema", () => {
  it("normalizes email", () => {
    const parsed = resetRequestSchema.parse({ email: " User@Example.COM " })

    expect(parsed.email).toBe("user@example.com")
  })

  it.each([
    ["", "Введите email"],
    ["user@", "Некорректный адрес электронной почты"],
  ])("rejects email %j with '%s'", (email, message) => {
    expect(getResetRequestErrors({ email }).email).toBe(message)
  })
})

describe("resetPasswordSchema", () => {
  it("accepts valid data", () => {
    expect(getResetPasswordErrors({})).toEqual({})
  })

  it.each([null, ""])("rejects token %j", (token) => {
    expect(getResetPasswordErrors({ token }).token).toBe(
      "Ссылка недействительна",
    )
  })

  it("applies the password rules", () => {
    const password = "пароль123"

    expect(
      getResetPasswordErrors({ password, passwordConfirm: password }).password,
    ).toBe("Только латинские буквы, цифры и символы")
  })

  it("rejects mismatched passwords", () => {
    expect(
      getResetPasswordErrors({ passwordConfirm: "secret124" }).passwordConfirm,
    ).toBe("Пароли не совпадают")
  })
})
