"use client"

import classNames from "classnames"

import { useBaseId } from "@/shared/lib/useBaseId"
import Icon from "@/shared/ui/Icon"

import "./TristateCheckbox.scss"

export type TriState = "none" | "include" | "exclude"

interface TristateCheckboxProps {
  className?: string
  label: string
  state: TriState
  onStateChange: (state: TriState) => void
}

const nextState: Record<TriState, TriState> = {
  none: "include",
  include: "exclude",
  exclude: "none",
}

const TristateCheckbox = ({
  className,
  label,
  state,
  onStateChange,
}: TristateCheckboxProps) => {
  const id = useBaseId()

  return (
    <button
      className={classNames("tristate-checkbox", className)}
      id={id}
      type="button"
      onClick={() => onStateChange(nextState[state])}
    >
      <span className="tristate-checkbox__square">
        {state === "include" ? (
          <Icon
            className="tristate-checkbox__icon tristate-checkbox__icon--plus"
            name="plus"
          />
        ) : state === "exclude" ? (
          <Icon
            className="tristate-checkbox__icon tristate-checkbox__icon--minus"
            name="minus"
          />
        ) : null}
      </span>
      {label}
      <span className="visually-hidden">
        {state === "none"
          ? ", не включено"
          : state === "include"
            ? ", включено"
            : ", исключено"}
      </span>
    </button>
  )
}

export default TristateCheckbox
