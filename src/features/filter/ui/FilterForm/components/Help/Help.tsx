"use client"

import { useState } from "react"
import classNames from "classnames"

import Icon from "@/shared/ui/Icon"

import "./Help.scss"

interface HelpProps {
  className?: string
  label: string
  variant?: "" | "solo"
  text?: string
  information?: { label: string; description: string }[]
}

const Help = ({
  className,
  label,
  variant = "",
  text,
  information = [],
}: HelpProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <span
      className={classNames(className, "help", {
        "help--solo": variant === "solo",
      })}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") setIsOpen(true)
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") setIsOpen(false)
      }}
    >
      <button
        className="help__button"
        type="button"
        aria-label={label}
        aria-expanded={isOpen}
        onPointerUp={(event) => {
          if (event.pointerType === "touch" || event.pointerType === "pen") {
            setIsOpen((open) => !open)
          }
        }}
        onClick={(event) => {
          if (event.detail === 0) {
            setIsOpen((open) => !open)
          }
        }}
      >
        <Icon className="help__icon" name="information" />
      </button>
      <span
        className={classNames("help__panel", {
          "help__panel--open": isOpen,
        })}
        aria-hidden={!isOpen}
      >
        {variant === "solo"
          ? text
          : information.map((item) => (
              <span key={item.label}>
                <strong>{item.label}</strong> - {item.description}
              </span>
            ))}
      </span>
    </span>
  )
}

export default Help
