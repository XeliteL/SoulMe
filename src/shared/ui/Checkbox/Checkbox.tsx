import { type ReactNode } from "react"
import classNames from "classnames"

import { useBaseId } from "@/shared/lib/useBaseId"

import "./Checkbox.scss"

interface CheckboxProps {
  className?: string
  id?: string
  label: ReactNode
  isRequired?: boolean
}

const Checkbox = ({ className, id, label, isRequired }: CheckboxProps) => {
  const baseId = useBaseId(id)
  const controlId = `${baseId}-checkbox`

  return (
    <label className={classNames(className, "checkbox")} htmlFor={controlId}>
      <input
        id={controlId}
        type="checkbox"
        className="checkbox__input"
        required={isRequired}
      />
      <span className="checkbox__label">{label}</span>
    </label>
  )
}

export default Checkbox
