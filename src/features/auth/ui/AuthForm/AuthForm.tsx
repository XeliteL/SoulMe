"use client"

import { ReactNode, useEffect, useRef } from "react"

import type { AuthFormState } from "../../model/types"

import "./AuthForm.scss"

interface AuthFormProps {
  children: ReactNode
  action: (formData: FormData) => void
  state: AuthFormState
}

const AuthForm = ({ children, action, state }: AuthFormProps) => {
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    formRef.current
      ?.querySelector<HTMLElement>('[aria-invalid="true"]')
      ?.focus()
  }, [state])

  return (
    <div className="auth-form">
      <form className="auth-form__form" ref={formRef} action={action}>
        {children}
      </form>
    </div>
  )
}

export default AuthForm
