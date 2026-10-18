import type { LoginFields, RegisterFields } from "./validation"

export interface AuthFormState<
  TField extends string = string,
  TValue extends TField = TField,
> {
  error?: string
  fieldErrors?: Partial<Record<TField, string>>
  values?: Partial<Record<TValue, string>>
}

export type LoginState = AuthFormState<LoginFields, "identifier" | "remember">
export type RegisterState = AuthFormState<
  RegisterFields,
  "login" | "email" | "agreement"
>
