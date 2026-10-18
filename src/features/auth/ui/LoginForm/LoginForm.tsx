"use client"

import { useActionState } from "react"
import Link from "next/link"

import Button from "@/shared/ui/Button"
import Checkbox from "@/shared/ui/Checkbox"
import Field from "@/shared/ui/Field"

import { login } from "../../api/actions"
import { initialState } from "../../model/initialState"
import AuthForm from "../AuthForm"
import AuthFormError from "../AuthFormError"

const LoginForm = () => {
  const [state, formAction, isPending] = useActionState(login, initialState)

  return (
    <AuthForm action={formAction} state={state}>
      <Field
        label="Логин или email"
        name="identifier"
        placeholder="example@example.com"
        autoComplete="username"
        error={state.fieldErrors?.identifier}
        defaultValue={state.values?.identifier}
        isRequired
        hasRequiredMark={false}
      />
      <Field
        label="Пароль"
        name="password"
        type="password"
        placeholder="Введите пароль"
        autoComplete="current-password"
        error={state.fieldErrors?.password}
        isRequired
        hasRequiredMark={false}
      />
      <div className="auth-form__cell">
        <div className="auth-form__row">
          <Checkbox
            label="Запомнить меня"
            name="remember"
            defaultChecked={state.values?.remember === "on"}
          />
          <Link href="/reset-password">Забыли пароль?</Link>
        </div>
        <AuthFormError message={state.error} />
        <Button
          className="auth-form__submit-button"
          label="Войти"
          type="submit"
          disabled={isPending}
        />
      </div>
    </AuthForm>
  )
}

export default LoginForm
