import "./Button.scss"
import classNames from "classnames"
import { HTMLAttributeAnchorTarget } from "react"
import Icon, { IconName } from "@/shared/ui/Icon"

interface ButtonProps {
  className?: string
  type?: "button" | "submit" | "reset"
  href?: string
  target?: HTMLAttributeAnchorTarget
  variant?: "" | "transparent"
  label?: string
  isLabelHidden?: boolean
  iconName?: IconName
  iconPosition?: "before" | "after"
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
}: ButtonProps) => {
  const isLink = !!href
  const Component = isLink ? "a" : "button"

  const linkProps = { href, target }
  const buttonProps = { type }
  const specificProps = isLink ? linkProps : buttonProps
  const title = isLabelHidden ? label : undefined
  const iconComponent = iconName && (
    <Icon className="button__icon" name={iconName} />
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
