import { ReactNode } from "react"

import Content from "@/shared/ui/Content"
import Header from "@/widgets/Header"

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <Content>{children}</Content>
    </>
  )
}
