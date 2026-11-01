"use client"

import { useActionState } from "react"
import Link from "next/link"

import Button from "@/shared/ui/Button"
import Checkbox from "@/shared/ui/Checkbox"
import Field from "@/shared/ui/Field"

import { register } from "../../api/actions"
import { initialState } from "../../model/initialState"
import AuthForm from "../AuthForm"
import AuthFormMessage from "../AuthFormMessage"

const RegisterForm = () => {
  const [state, formAction, isPending] = useActionState(register, initialState)

  return (
    <AuthForm action={formAction} state={state}>
      <Field
        label="Логин"
        name="login"
        placeholder="example"
        autoComplete="username"
        error={state.fieldErrors?.login}
        defaultValue={state.values?.login}
        hint="3–20 символов: латиница, цифры, «-» и «_»"
        isRequired
        hasRequiredMark={false}
      />
      <Field
        label="Email"
        name="email"
        type="email"
        placeholder="example@example.com"
        autoComplete="email"
        error={state.fieldErrors?.email}
        defaultValue={state.values?.email}
        isRequired
        hasRequiredMark={false}
      />
      <div className="auth-form__cell auth-form__cell--input">
        <Field
          label="Пароль"
          name="password"
          type="password"
          placeholder="Введите пароль"
          autoComplete="new-password"
          error={state.fieldErrors?.password}
          hint="8–64 символа: хотя бы одна латинская буква и цифра"
          isRequired
          hasRequiredMark={false}
        />
        <Field
          label="Повторите пароль"
          name="passwordConfirm"
          type="password"
          placeholder="Повторите пароль"
          autoComplete="new-password"
          error={state.fieldErrors?.passwordConfirm}
          isRequired
          hasRequiredMark={false}
        />
      </div>
      <Checkbox
        label={
          <>
            Я соглашаюсь с{" "}
            <Link href="/legal/terms" target="_blank" rel="noopener noreferrer">
              условиями использования
            </Link>{" "}
            и{" "}
            <Link
              href="/legal/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              политикой конфиденциальности
            </Link>
          </>
        }
        name="agreement"
        error={state.fieldErrors?.agreement}
        defaultChecked={state.values?.agreement === "on"}
        isRequired
      />
      <AuthFormMessage message={state.error} />
      <Button
        className="auth-form__submit-button"
        label="Зарегистрироваться"
        type="submit"
        disabled={isPending}
      />
    </AuthForm>
  )
}

export default RegisterForm
