"use server"

import { getFieldErrors } from "../model/getFieldErrors"
import { socialProviders } from "../model/socialProviders"
import {
  type LoginState,
  type RegisterState,
  type SocialLoginState,
} from "../model/types"
import {
  type LoginFields,
  loginSchema,
  type RegisterFields,
  registerSchema,
} from "../model/validation"

export async function login(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const parsed = loginSchema.safeParse({
    identifier: formData.get("identifier"),
    password: formData.get("password"),
    remember: formData.get("remember"),
  })

  const values = {
    identifier: String(formData.get("identifier") ?? ""),
    remember: String(formData.get("remember") ?? ""),
  }

  if (!parsed.success) {
    return { fieldErrors: getFieldErrors<LoginFields>(parsed.error), values }
  }

  return { error: "Вход временно недоступен", values }
}

export async function register(
  _prevState: RegisterState,
  formData: FormData,
): Promise<RegisterState> {
  const parsed = registerSchema.safeParse({
    login: formData.get("login"),
    email: formData.get("email"),
    password: formData.get("password"),
    passwordConfirm: formData.get("passwordConfirm"),
    agreement: formData.get("agreement"),
  })

  const values = {
    login: String(formData.get("login") ?? ""),
    email: String(formData.get("email") ?? ""),
    agreement: String(formData.get("agreement") ?? ""),
  }

  if (!parsed.success) {
    return { fieldErrors: getFieldErrors<RegisterFields>(parsed.error), values }
  }

  return { error: "Регистрация временно недоступна", values }
}

export async function signInWithProvider(
  _prevState: SocialLoginState,
  formData: FormData,
): Promise<SocialLoginState> {
  const provider = socialProviders.find(
    ({ id }) => id === formData.get("provider"),
  )

  if (!provider) {
    return { error: "Неизвестный способ входа" }
  }

  return { error: `Вход через ${provider.label} временно недоступен` }
}
