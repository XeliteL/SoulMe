import { HTMLAttributeAnchorTarget } from "react"
import classNames from "classnames"

import Icon, { IconName } from "@/shared/ui/Icon"

import "./Button.scss"

interface ButtonProps {
  className?: string
  type?: "button" | "submit" | "reset"
  href?: string
  target?: HTMLAttributeAnchorTarget
  variant?: "" | "transparent" | "black-10" | "black-06"
  label?: string
  isLabelHidden?: boolean
  iconName?: IconName
  iconPosition?: "before" | "after"
  hasFillIcon?: boolean
}

const Button = ({
  className,
  type = "button",
  href,
  target,
  variant = "",
  label,
  isLabelHidden = false,
  iconName,
  iconPosition = "before",
  hasFillIcon,
}: ButtonProps) => {
  const isLink = !!href
  const Component = isLink ? "a" : "button"

  const linkProps = {
    href,
    target,
    rel: target === "_blank" ? "noopener noreferrer" : undefined,
  }
  const buttonProps = { type }
  const specificProps = isLink ? linkProps : buttonProps
  const title = isLabelHidden ? label : undefined
  const iconComponent = iconName && (
    <Icon className="button__icon" name={iconName} hasFill={hasFillIcon} />
  )

  return (
    <Component
      className={classNames(className, "button", {
        [`button--${variant}`]: variant,
      })}
      title={title}
      aria-label={title}
      {...specificProps}
    >
      {iconPosition === "before" && iconComponent}
      {!isLabelHidden && <span className="button__label">{label}</span>}
      {iconPosition === "after" && iconComponent}
    </Component>
  )
}

export default Button
