import { z } from "zod"

export const loginSchema = z.object({
  identifier: z
    .string("Введите логин или email")
    .trim()
    .min(1, "Введите логин или email")
    .max(254, "Максимум 254 символа"),
  password: z
    .string("Введите пароль")
    .min(1, "Введите пароль")
    .max(64, "Максимум 64 символа"),
  remember: z
    .literal("on")
    .nullable()
    .transform((value) => value === "on"),
})

const emailSchema = z
  .string("Введите email")
  .trim()
  .min(1, "Введите email")
  .max(254, "Максимум 254 символа")
  .toLowerCase()
  .pipe(z.email("Некорректный адрес электронной почты"))

const passwordSchema = z
  .object({
    password: z
      .string("Введите пароль")
      .min(1, "Введите пароль")
      .min(8, "Минимум 8 символов")
      .max(64, "Максимум 64 символа")
      .regex(/^[\x21-\x7E]+$/, "Только латинские буквы, цифры и символы")
      .regex(/[a-z]/i, "Хотя бы одна латинская буква")
      .regex(/\d/, "Хотя бы одна цифра"),
    passwordConfirm: z.string("Повторите пароль").min(1, "Повторите пароль"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    error: "Пароли не совпадают",
    path: ["passwordConfirm"],
    when: ({ issues }) =>
      !issues.some(({ path }) =>
        ["password", "passwordConfirm"].includes(String(path?.[0])),
      ),
  })

export const registerSchema = passwordSchema.extend({
  login: z
    .string("Введите логин")
    .trim()
    .min(1, "Введите логин")
    .min(3, "Минимум 3 символа")
    .max(20, "Максимум 20 символов")
    .regex(/^[a-z0-9_-]+$/i, "Только латинские буквы, цифры, «-» и «_»")
    .regex(
      /^[a-z0-9].*[a-z0-9]$/i,
      "Должен начинаться и заканчиваться буквой или цифрой",
    ),
  email: emailSchema,
  agreement: z.literal("on", "Необходимо принять условия"),
})

export const resetRequestSchema = z.object({
  email: emailSchema,
})

export const resetPasswordSchema = passwordSchema.extend({
  token: z.string("Ссылка недействительна").min(1, "Ссылка недействительна"),
})

export type LoginData = z.infer<typeof loginSchema>
export type RegisterData = z.infer<typeof registerSchema>
export type ResetRequestData = z.infer<typeof resetRequestSchema>
export type ResetPasswordData = z.infer<typeof resetPasswordSchema>

export type LoginFields = keyof LoginData
export type RegisterFields = keyof RegisterData
export type ResetRequestFields = keyof ResetRequestData
export type ResetPasswordFields = keyof ResetPasswordData
