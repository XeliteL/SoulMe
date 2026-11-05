import Tabs from "@/shared/ui/Tabs"

import { authTabs } from "./config/authTabs"

import "./Auth.scss"

const Auth = () => {
  return (
    <div className="auth">
      <h1 className="visually-hidden">Вход и регистрация</h1>
      <Tabs
        className="auth__tabs"
        title="Вход и регистрация"
        items={authTabs}
        shouldResetInactive
      />
    </div>
  )
}

export default Auth
