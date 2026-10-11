import classNames from "classnames"

import Button from "@/shared/ui/Button"
import Logo from "@/shared/ui/Logo"
import MenuToggle from "@/shared/ui/MenuToggle"

import HeaderMenu from "./components/HeaderMenu"
import HeaderScrollRuntime from "./components/HeaderScrollRuntime"

import "./Header.scss"

interface HeaderProps {
  isFixed?: boolean
}

const Header = ({ isFixed }: HeaderProps) => {
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
            <HeaderMenu />
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
            dialogId="header-menu"
            className="header__burger-button visible-tablet"
          />
        </div>
      </div>
      <HeaderScrollRuntime />
    </header>
  )
}

export default Header
