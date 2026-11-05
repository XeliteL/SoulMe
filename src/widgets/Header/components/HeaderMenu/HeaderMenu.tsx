"use client"

import classNames from "classnames"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { navigation as menuItems } from "@/shared/config/navigation"
import { isActivePath } from "@/shared/lib/isActivePath"

const HeaderMenu = () => {
  const pathname = usePathname()

  return (
    <ul className="header__menu-list">
      {menuItems.map(({ label, href }) => {
        const isActive = isActivePath(pathname, href)

        return (
          <li className="header__menu-item" key={href}>
            <Link
              className={classNames("header__menu-link", {
                "is-active": isActive,
              })}
              href={href}
              aria-current={
                pathname === href ? "page" : isActive ? "true" : undefined
              }
              onClick={() => {
                if (pathname === href) window.scrollTo({ top: 0 })
              }}
            >
              {label}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export default HeaderMenu
