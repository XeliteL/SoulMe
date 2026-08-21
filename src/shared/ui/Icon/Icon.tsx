import classNames from "classnames"
import { Sprite as MinistaIcon } from "minista/assets"
import "./Icon.scss"

export const ICON_NAMES = ["notification", "search", "telegram"] as const
export type IconName = (typeof ICON_NAMES)[number]

interface IconProps {
  className?: string
  name: IconName
  hasFill?: boolean
}

const Icon = ({ className, name, hasFill = false }: IconProps) => {
  return (
    <span className={classNames(className, "icon")}>
      <MinistaIcon
        src={`/src/shared/assets/icons/${name}.svg`}
        fill={hasFill ? "currentColor" : "none"}
        stroke={hasFill ? "none" : "currentColor"}
      />
    </span>
  )
}

export default Icon
