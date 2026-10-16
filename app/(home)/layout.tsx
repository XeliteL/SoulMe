import { ReactNode } from "react"

import Content from "@/shared/ui/Content"
import Footer from "@/widgets/Footer"
import Header from "@/widgets/Header"

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header isFixed />
      <Content isResetPaddingTop>{children}</Content>
      <Footer />
    </>
  )
}
