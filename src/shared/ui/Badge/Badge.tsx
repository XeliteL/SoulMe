import { ReactNode } from "react"
import classNames from "classnames"

import Icon from "@/shared/ui/Icon"

import "./Badge.scss"

interface BadgeProps {
  className?: string
  variant?: "" | "accent" | "accent-round" | "favorite"
  children?: ReactNode
  iconName?: "duration" | "views" | "heart"
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
      {iconLabel && (
        <span className="visually-hidden">
          {iconLabel}
          {children && ": "}
        </span>
      )}
      {children && <span>{children}</span>}
    </div>
  )
}

export default Badge
