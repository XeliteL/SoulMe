"use client"

import { ReactNode, ViewTransition } from "react"
import { usePathname } from "next/navigation"

import "./PageTransition.scss"

interface PageTransitionProps {
  children: ReactNode
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const pathname = usePathname()

  return (
    <ViewTransition
      key={pathname}
      enter="page-enter"
      exit="page-exit"
      default="none"
    >
      {children}
    </ViewTransition>
  )
}

export default PageTransition
