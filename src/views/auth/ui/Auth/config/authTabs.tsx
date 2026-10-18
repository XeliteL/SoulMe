import { LoginForm, RegisterForm } from "@/features/auth"
import { TabItem } from "@/shared/ui/Tabs"

export const authTabs: TabItem[] = [
  {
    id: "authorization",
    title: "Авторизация",
    isActive: true,
    children: <LoginForm />,
  },
  {
    id: "register",
    title: "Регистрация",
    children: <RegisterForm />,
  },
]
