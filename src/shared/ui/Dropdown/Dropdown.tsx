"use client"

import { type ReactNode, useId } from "react"
import classNames from "classnames"

import Button from "@/shared/ui/Button"
import type { IconName } from "@/shared/ui/Icon"

import { useDropdown } from "./lib/useDropdown"

import "./Dropdown.scss"

interface DropdownProps {
  className?: string
  label: string
  iconName?: IconName
  hasFillIcon?: boolean
  children?: ReactNode
}

const Dropdown = ({
  className,
  label,
  iconName,
  hasFillIcon,
  children,
}: DropdownProps) => {
  const panelId = useId()
  const { rootRef, buttonRef, dropdownRef, isExpanded, toggle, handleKeyDown } =
    useDropdown()

  return (
    <div
      className={classNames(className, "dropdown")}
      ref={rootRef}
      onKeyDown={handleKeyDown}
    >
      <Button
        className="dropdown__button"
        type="button"
        variant="black-06"
        iconName={iconName}
        label={label}
        isExpanded={isExpanded}
        ref={buttonRef}
        controls={panelId}
        hasFillIcon={hasFillIcon}
        onClick={toggle}
      />
      <div
        className={classNames("dropdown__panel", {
          "is-expanded": isExpanded,
        })}
        id={panelId}
        ref={dropdownRef}
      >
        {children}
      </div>
    </div>
  )
}

export default Dropdown
