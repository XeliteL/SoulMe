import { ReactNode } from "react"

import Content from "@/shared/ui/Content"
import Header from "@/widgets/Header"

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header isFixed />
      <Content isResetPaddingTop>{children}</Content>
    </>
  )
}
