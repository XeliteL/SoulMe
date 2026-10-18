import { describe, expect, it } from "vitest"

import { getFieldErrors } from "./getFieldErrors"
import { loginSchema, registerSchema } from "./validation"

const validRegister = {
  login: "soul_me",
  email: "user@example.com",
  password: "secret123",
  passwordConfirm: "secret123",
  agreement: "on",
}

const getRegisterErrors = (data: Record<string, unknown>) => {
  const parsed = registerSchema.safeParse({ ...validRegister, ...data })

  return parsed.success ? {} : getFieldErrors(parsed.error)
}

describe("loginSchema", () => {
  it.each([
    ["on", true],
    [null, false],
  ])("parses remember '%s' as %s", (remember, expected) => {
    const parsed = loginSchema.parse({
      identifier: "user",
      password: "1",
      remember,
    })

    expect(parsed.remember).toBe(expected)
  })

  it("rejects a blank identifier", () => {
    const parsed = loginSchema.safeParse({
      identifier: "   ",
      password: "1",
      remember: null,
    })

    expect(parsed.success).toBe(false)
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
    ["ab", "Минимум 3 символа"],
    ["a".repeat(21), "Максимум 20 символов"],
    ["логин", "Только латинские буквы, цифры, «-» и «_»"],
    ["-soul", "Должен начинаться и заканчиваться буквой или цифрой"],
    ["soul_", "Должен начинаться и заканчиваться буквой или цифрой"],
  ])("rejects login %j with '%s'", (login, message) => {
    expect(getRegisterErrors({ login }).login).toBe(message)
  })

  it("rejects an invalid email", () => {
    expect(getRegisterErrors({ email: "user@" }).email).toBe(
      "Некорректный адрес электронной почты",
    )
  })

  it.each([
    ["a1", "Минимум 8 символов"],
    ["a1".repeat(33), "Максимум 64 символа"],
    ["12345678", "Хотя бы одна латинская буква"],
    ["password", "Хотя бы одна цифра"],
  ])("rejects password %j with '%s'", (password, message) => {
    expect(
      getRegisterErrors({ password, passwordConfirm: password }).password,
    ).toBe(message)
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
