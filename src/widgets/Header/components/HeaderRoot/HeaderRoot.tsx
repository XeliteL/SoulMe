"use client"

import { ReactNode, useSyncExternalStore } from "react"
import classNames from "classnames"

interface HeaderRootProps {
  className?: string
  children: ReactNode
}

const subscribe = (onChange: () => void) => {
  window.addEventListener("scroll", onChange, { passive: true })
  return () => window.removeEventListener("scroll", onChange)
}

const getIsScrolled = () => window.scrollY > 0

const HeaderRoot = ({ className, children }: HeaderRootProps) => {
  const isScrolled = useSyncExternalStore(subscribe, getIsScrolled, () => false)

  return (
    <header
      className={classNames(className, {
        "is-scrolled": isScrolled,
      })}
    >
      {children}
    </header>
  )
}

export default HeaderRoot
