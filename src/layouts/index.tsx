import { ReactNode } from "react"
import { Head } from "minista/head"

import "@/app/styles"

import GrayFavicon from "@/shared/ui/GrayFavicon"
import Content from "@/widgets/Content"
import Footer from "@/widgets/Footer"
import Header from "@/widgets/Header"

interface GlobalProps {
  children: ReactNode
  title: string
  url: string
  isHeaderFixed?: boolean
}

export default function Index({
  children,
  title,
  url,
  isHeaderFixed,
}: GlobalProps) {
  return (
    <>
      <Head htmlAttributes={{ lang: "ru" }}>
        <title>SoulMe | {title}</title>
        <link rel="icon" sizes="any" href="/favicon.ico" />
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
      <GrayFavicon client:load />
      <Header url={url} isFixed={isHeaderFixed} />
      <Content>{children}</Content>
      <Footer />
    </>
  )
}
