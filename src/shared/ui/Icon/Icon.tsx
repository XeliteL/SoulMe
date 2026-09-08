import classNames from "classnames"
import { Sprite as MinistaIcon } from "minista/assets"

import { IconName } from "./iconName"

import "./Icon.scss"

interface IconProps {
  className?: string
  name: IconName
  hasFill?: boolean
}

const Icon = ({ className, name, hasFill = false }: IconProps) => {
  return (
    <span className={classNames(className, "icon")} aria-hidden="true">
      <MinistaIcon
        src={`/src/shared/assets/icons/${name}.svg`}
        fill={hasFill ? "currentColor" : "none"}
        stroke={hasFill ? "none" : "currentColor"}
      />
    </span>
  )
}

export default Icon
