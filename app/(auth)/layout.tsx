import { ReactNode } from "react"

import PageTransition from "@/shared/ui/PageTransition"
import AuthLayout from "@/widgets/AuthLayout"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <AuthLayout>
      <PageTransition>{children}</PageTransition>
    </AuthLayout>
  )
}
