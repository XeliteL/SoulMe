import { ReactNode } from "react"

import AuthBanner from "./components/AuthBanner"

import "./AuthLayout.scss"

interface AuthLayoutProps {
  children: ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <main className="auth-layout">
      <AuthBanner />
      <div className="auth-layout__panel">
        <div className="auth-layout__inner">{children}</div>
      </div>
    </main>
  )
}

export default AuthLayout
