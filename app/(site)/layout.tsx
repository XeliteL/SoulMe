import { ReactNode } from "react"

import Content from "@/shared/ui/Content"
import PageTransition from "@/shared/ui/PageTransition"
import Footer from "@/widgets/Footer"
import Header from "@/widgets/Header"

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <Content>
        <PageTransition>{children}</PageTransition>
      </Content>
      <Footer />
    </>
  )
}
