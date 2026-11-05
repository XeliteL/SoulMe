import Tabs from "@/shared/ui/Tabs"

import { authTabs } from "./config/authTabs"

import "./Auth.scss"

const Auth = () => {
  return (
    <div className="auth">
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
