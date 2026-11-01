import type {
  LoginFields,
  RegisterFields,
  ResetPasswordFields,
  ResetRequestFields,
} from "./validation"

export interface AuthFormState<
  TField extends string = string,
  TValue extends TField = TField,
> {
  error?: string
  fieldErrors?: Partial<Record<TField, string>>
  values?: Partial<Record<TValue, string>>
  success?: string
}

export type LoginState = AuthFormState<LoginFields, "identifier" | "remember">
export type RegisterState = AuthFormState<
  RegisterFields,
  "login" | "email" | "agreement"
>
export type SocialLoginState = AuthFormState<never>

export type ResetRequestState = AuthFormState<ResetRequestFields, "email">
export type ResetPasswordState = AuthFormState<ResetPasswordFields, never>
