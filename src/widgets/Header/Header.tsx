import classNames from "classnames"

import { navigation as menuItems } from "@/shared/config/navigation"
import Button from "@/shared/ui/Button"
import Logo from "@/shared/ui/Logo"
import MenuToggle from "@/shared/ui/MenuToggle"

import "./Header.scss"

interface HeaderProps {
  url?: string
  isFixed?: boolean
}

const Header = ({ url, isFixed }: HeaderProps) => {
  return (
    <header
      className={classNames("header", {
        "is-fixed": isFixed,
      })}
    >
      <div className="header__inner container">
        <Logo className="header__logo" loading="eager" />
        <dialog className="header__overlay-menu-dialog" id="header-menu">
          <nav className="header__menu" aria-label="Основная навигация">
            <ul className="header__menu-list">
              {menuItems.map(({ label, href }) => (
                <li className="header__menu-item" key={href}>
                  <a
                    className={classNames("header__menu-link", {
                      "is-active": href === url,
                    })}
                    href={href}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </dialog>
        <div className="header__actions">
          <div className="header__actions__buttons-container">
            <Button
              className="header__button"
              label="Поиск"
              isLabelHidden
              variant="transparent"
              iconName="search"
            />
            <Button
              label="Уведомления"
              isLabelHidden
              variant="transparent"
              iconName="notification"
            />
            <Button
              label="Вы"
              isLabelHidden
              variant="transparent"
              iconName="user"
            />
          </div>
          <MenuToggle
            client:load
            dialogId="header-menu"
            className="header__burger-button visible-tablet"
          />
        </div>
      </div>
    </header>
  )
}

export default Header
