"use client"

import { useActionState } from "react"
import Link from "next/link"

import Button from "@/shared/ui/Button"
import Field from "@/shared/ui/Field"

import { resetPassword } from "../../api/actions"
import { initialState } from "../../model/initialState"
import AuthForm from "../AuthForm"
import AuthFormMessage from "../AuthFormMessage"

interface ResetPasswordFormProps {
  token: string
  email?: string
}

const ResetPasswordForm = ({ token, email }: ResetPasswordFormProps) => {
  const [state, formAction, isPending] = useActionState(
    resetPassword,
    initialState,
  )

  return (
    <AuthForm
      state={state}
      action={formAction}
      footer={
        !state.success && (
          <>
            <Link href="/auth">Вернуться ко входу</Link>
            <Link href="/reset-password">Запросить новую ссылку</Link>
          </>
        )
      }
    >
      <input type="hidden" name="token" value={token} />
      {email && (
        <input
          type="email"
          autoComplete="username"
          value={email}
          readOnly
          hidden
        />
      )}
      {!state.success && (
        <>
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
        </>
      )}
      <div className="auth-form__cell">
        <AuthFormMessage message={state.error} />
        <AuthFormMessage type="success" message={state.success} />
        {state.success ? (
          <Link href="/auth">Войти</Link>
        ) : (
          <Button
            className="auth-form__submit-button"
            label="Сохранить пароль"
            type="submit"
            disabled={isPending}
          />
        )}
      </div>
    </AuthForm>
  )
}

export default ResetPasswordForm
