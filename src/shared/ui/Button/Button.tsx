import { HTMLAttributeAnchorTarget, MouseEventHandler } from "react"
import classNames from "classnames"
import Link from "next/link"

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
  disabled?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
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
  disabled,
  onClick,
}: ButtonProps) => {
  const title = isLabelHidden ? label : undefined
  const commonProps = {
    className: classNames(className, "button", {
      [`button--${variant}`]: variant,
    }),
    title,
    "aria-label": title,
  }
  const iconComponent = iconName && (
    <Icon className="button__icon" name={iconName} hasFill={hasFillIcon} />
  )
  const content = (
    <>
      {iconPosition === "before" && iconComponent}
      {!isLabelHidden && <span className="button__label">{label}</span>}
      {iconPosition === "after" && iconComponent}
    </>
  )

  if (!href) {
    return (
      <button
        type={type}
        disabled={disabled}
        onClick={onClick}
        {...commonProps}
      >
        {content}
      </button>
    )
  }

  const isExternal = !href.startsWith("/") || target === "_blank"

  if (isExternal) {
    const rel = target === "_blank" ? "noopener noreferrer" : undefined

    return (
      <a href={href} target={target} rel={rel} {...commonProps}>
        {content}
      </a>
    )
  }

  return (
    <Link href={href} target={target} {...commonProps}>
      {content}
    </Link>
  )
}

export default Button
