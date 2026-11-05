import { ReactNode } from "react"
import classNames from "classnames"

import Icon from "@/shared/ui/Icon"

import "./Badge.scss"

interface BadgeProps {
  className?: string
  variant?: "" | "accent"
  children: ReactNode
  iconName?: "duration" | "views"
  hasFillIcon?: boolean
  iconLabel?: string
}

const Badge = ({
  className,
  variant = "",
  children,
  iconName,
  hasFillIcon = true,
  iconLabel,
}: BadgeProps) => {
  return (
    <div
      className={classNames(className, "badge", {
        [`badge--${variant}`]: variant,
      })}
    >
      {iconName && (
        <Icon className="badge__icon" name={iconName} hasFill={hasFillIcon} />
      )}
      <span>
        {iconLabel && <span className="visually-hidden">{iconLabel}: </span>}
        {children}
      </span>
    </div>
  )
}

export default Badge
