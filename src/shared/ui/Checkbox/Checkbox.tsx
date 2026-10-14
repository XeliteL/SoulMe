import { type ReactNode } from "react"
import classNames from "classnames"

import { useBaseId } from "@/shared/lib/useBaseId"

import "./Checkbox.scss"

interface CheckboxProps {
  className?: string
  id?: string
  label: ReactNode
  name: string
  isRequired?: boolean
}

const Checkbox = ({
  className,
  id,
  label,
  name,
  isRequired,
}: CheckboxProps) => {
  const baseId = useBaseId(id)
  const controlId = `${baseId}-checkbox`

  return (
    <label className={classNames(className, "checkbox")} htmlFor={controlId}>
      <input
        id={controlId}
        type="checkbox"
        name={name}
        className="checkbox__input"
        required={isRequired}
      />
      <span className="checkbox__label">{label}</span>
    </label>
  )
}

export default Checkbox
