"use client"

import { useActionState } from "react"
import Link from "next/link"

import Button from "@/shared/ui/Button"
import Field from "@/shared/ui/Field"

import { requestPasswordReset } from "../../api/actions"
import { initialState } from "../../model/initialState"
import AuthForm from "../AuthForm"
import AuthFormMessage from "../AuthFormMessage"

const RequestResetForm = () => {
  const [state, formAction, isPending] = useActionState(
    requestPasswordReset,
    initialState,
  )

  return (
    <AuthForm
      state={state}
      action={formAction}
      footer={<Link href="/auth">Вернуться ко входу</Link>}
    >
      <Field
        label="Введите email, привязанный к аккаунту"
        name="email"
        type="email"
        autoComplete="email"
        error={state.fieldErrors?.email}
        defaultValue={state.values?.email}
        isRequired
        hasRequiredMark={false}
        placeholder="example@example.com"
      />
      <div className="auth-form__cell">
        <AuthFormMessage message={state.error} />
        <AuthFormMessage type="success" message={state.success} />
        <Button
          className="auth-form__submit-button"
          label="Отправить ссылку"
          type="submit"
          disabled={isPending}
        />
      </div>
    </AuthForm>
  )
}

export default RequestResetForm
