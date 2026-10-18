import { z } from "zod"

export const loginSchema = z.object({
  identifier: z
    .string("Введите логин или email")
    .trim()
    .min(1, "Введите логин или email"),
  password: z.string("Введите пароль").min(1, "Введите пароль"),
  remember: z
    .literal("on")
    .nullable()
    .transform((value) => value === "on"),
})

export const registerSchema = z
  .object({
    login: z
      .string("Введите логин")
      .trim()
      .min(3, "Минимум 3 символа")
      .max(20, "Максимум 20 символов")
      .regex(/^[a-z0-9_-]+$/i, "Только латинские буквы, цифры, «-» и «_»")
      .regex(
        /^[a-z0-9].*[a-z0-9]$/i,
        "Должен начинаться и заканчиваться буквой или цифрой",
      ),
    email: z
      .string("Введите email")
      .trim()
      .toLowerCase()
      .pipe(z.email("Некорректный адрес электронной почты")),
    password: z
      .string("Введите пароль")
      .min(8, "Минимум 8 символов")
      .max(64, "Максимум 64 символа")
      .regex(/[a-z]/i, "Хотя бы одна латинская буква")
      .regex(/\d/, "Хотя бы одна цифра"),
    passwordConfirm: z.string("Повторите пароль").min(1, "Повторите пароль"),
    agreement: z.literal("on", "Необходимо принять условия"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    error: "Пароли не совпадают",
    path: ["passwordConfirm"],
    when: ({ issues }) =>
      !issues.some(({ path }) =>
        ["password", "passwordConfirm"].includes(String(path?.[0])),
      ),
  })

export type LoginData = z.infer<typeof loginSchema>
export type RegisterData = z.infer<typeof registerSchema>

export type LoginFields = keyof LoginData
export type RegisterFields = keyof RegisterData
