"use client"

import { useActionState } from "react"

import Button from "@/shared/ui/Button"

import { signInWithProvider } from "../../api/actions"
import { initialState } from "../../model/initialState"
import { socialProviders } from "../../model/socialProviders"
import AuthFormError from "../AuthFormError"

import "./SocialLogin.scss"

const SocialLogin = () => {
  const [state, formAction, isPending] = useActionState(
    signInWithProvider,
    initialState,
  )

  return (
    <form action={formAction} className="soc1al-login">
      <div className="soc1al-login__options">
        <p className="soc1al-login__paragraph">Вы можете войти с помощью</p>
        <ul className="soc1al-login__list">
          {socialProviders.map((provider) => (
            <li key={provider.id}>
              <Button
                type="submit"
                name="provider"
                value={provider.id}
                variant="black-06"
                label={`Войти через ${provider.label}`}
                isLabelHidden
                iconName={provider.iconName}
                hasFillIcon
                disabled={isPending}
              />
            </li>
          ))}
        </ul>
      </div>
      <AuthFormError message={state.error} />
    </form>
  )
}

export default SocialLogin
