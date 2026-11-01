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
  hasRequiredMark?: boolean
  error?: string
  defaultChecked?: boolean
}

const Checkbox = ({
  className,
  id,
  label,
  name,
  isRequired,
  hasRequiredMark = true,
  error,
  defaultChecked,
}: CheckboxProps) => {
  const baseId = useBaseId(id)
  const controlId = `${baseId}-checkbox`
  const errorId = `${baseId}-error`

  return (
    <div
      className={classNames(className, "checkbox", {
        "checkbox--invalid": error,
      })}
    >
      <label className="checkbox__control" htmlFor={controlId}>
        <input
          id={controlId}
          type="checkbox"
          name={name}
          className="checkbox__input"
          required={isRequired}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          defaultChecked={defaultChecked}
        />
        <span className="checkbox__label">
          {label}
          {isRequired && hasRequiredMark && (
            <>
              {" "}
              <span className="checkbox__required-star" aria-hidden="true">
                *
              </span>
            </>
          )}
        </span>
      </label>
      {error && (
        <p className="checkbox__error" id={errorId}>
          {error}
        </p>
      )}
    </div>
  )
}

export default Checkbox
