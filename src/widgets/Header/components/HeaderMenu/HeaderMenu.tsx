"use client"

import classNames from "classnames"
import { usePathname } from "next/navigation"

import { navigation as menuItems } from "@/shared/config/navigation"

const HeaderMenu = () => {
  const pathname = usePathname()

  return (
    <ul className="header__menu-list">
      {menuItems.map(({ label, href }) => (
        <li className="header__menu-item" key={href}>
          <a
            className={classNames("header__menu-link", {
              "is-active": href === pathname,
            })}
            href={href}
          >
            {label}
          </a>
        </li>
      ))}
    </ul>
  )
}

export default HeaderMenu
