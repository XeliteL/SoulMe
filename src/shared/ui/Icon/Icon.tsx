import classNames from "classnames"

import { IconName } from "./config/iconName"
import { ICON_SPRITE_URL } from "./config/iconSprite"

import "./Icon.scss"

interface IconProps {
  className?: string
  name: IconName
  hasFill?: boolean
}

const Icon = ({ className, name, hasFill = false }: IconProps) => {
  return (
    <span className={classNames(className, "icon")} aria-hidden="true">
      <svg
        fill={hasFill ? "currentColor" : "none"}
        stroke={hasFill ? "none" : "currentColor"}
      >
        <use href={`${ICON_SPRITE_URL}#${name}`} />
      </svg>
    </span>
  )
}

export default Icon
