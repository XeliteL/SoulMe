import classNames from "classnames"
import Logo from "@/shared/ui/Logo"
import { navigation as menuItems } from "@/shared/config/navigation"
import Button from "@/shared/ui/Button"
import MenuToggle from "@/shared/ui/MenuToggle"
import "./Header.scss"

interface HeaderProps {
  url?: string
}

const Header = ({ url }: HeaderProps) => {
  return (
    <header className="header">
      <div className="header__inner container">
        <Logo className="header__logo" loading="eager" />
        <dialog className="header__overlay-menu-dialog" id="header-menu">
          <nav className="header__menu">
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
              label="Search"
              isLabelHidden
              variant="transparent"
              iconName="search"
            />
            <Button
              href="/"
              label="Notifications"
              isLabelHidden
              variant="transparent"
              iconName="notification"
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
