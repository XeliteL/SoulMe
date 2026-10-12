import { ReactNode } from "react"
import type { Metadata } from "next"

import "@/shared/styles"

import { authStateScript } from "@/entities/session"
import { manrope } from "@/shared/styles/font"
import GrayFavicon from "@/shared/ui/GrayFavicon"
import Preloader from "@/shared/ui/Preloader"
import Footer from "@/widgets/Footer"

export const metadata: Metadata = {
  title: {
    template: "SoulMe | %s",
    default: "SoulMe",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
  },
  manifest: "/site.webmanifest",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning className={manrope.variable}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: authStateScript }} />
      </head>
      <body>
        <Preloader />
        <GrayFavicon />
        {children}
        <Footer />
      </body>
    </html>
  )
}
