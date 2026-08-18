import { ReactNode } from "react"
import { Head } from "minista/head"
import Header from "@/widgets/Header"
import Content from "@/widgets/Content"
import Footer from "@/widgets/Footer"
import "@/app/styles"

interface GlobalProps {
  children: ReactNode
  title: string
  url: string
}

export default function Index({ children, title, url }: GlobalProps) {
  return (
    <>
      <Head htmlAttributes={{ lang: "ru" }}>
        <title>SoulMe | {title}</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <Header url={url} />
      <Content>{children}</Content>
      <Footer />
    </>
  )
}
