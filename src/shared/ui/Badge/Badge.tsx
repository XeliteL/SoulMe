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
  iconAriaLabel?: string
}

const Badge = ({
  className,
  variant = "",
  children,
  iconName,
  hasFillIcon = true,
  iconAriaLabel,
}: BadgeProps) => {
  return (
    <div
      className={classNames(className, "badge", {
        [`badge--${variant}`]: variant,
      })}
    >
      {iconName && (
        <Icon
          className="badge__icon"
          name={iconName}
          hasFill={hasFillIcon}
          aria-label={iconAriaLabel}
        />
      )}
      <span>{children}</span>
    </div>
  )
}

export default Badge
