import { ReactNode } from "react"
import classNames from "classnames"

import { useBaseId } from "@/shared/lib/useBaseId"

import MaskedInput from "./components/MaskedInput"

import "./Field.scss"

interface FieldProps {
  className?: string
  id?: string
  label: string
  type?: "email" | "textarea"
  placeholder: string
  isRequired?: boolean
  inputMode?: "tel"
  mask?: string
  renderBefore?: (controlClassName: string) => ReactNode
}

const Field = ({
  className,
  id,
  label,
  type,
  placeholder,
  isRequired,
  inputMode,
  mask,
  renderBefore,
}: FieldProps) => {
  const baseId = useBaseId(id)
  const controlId = `${baseId}-field`
  const Component = type === "textarea" ? "textarea" : "input"

  return (
    <div className={classNames(className, "field")}>
      <label className="field__label" htmlFor={controlId}>
        {label}{" "}
        {isRequired && (
          <span className="field__required-star" aria-hidden="true">
            *
          </span>
        )}
      </label>
      <div className="field__body">
        {renderBefore?.("field__control")}
        {mask ? (
          <MaskedInput
            className="field__control"
            id={controlId}
            placeholder={placeholder}
            required={isRequired}
            inputMode={inputMode}
            mask={mask}
          />
        ) : (
          <Component
            className="field__control"
            id={controlId}
            placeholder={placeholder}
            required={isRequired}
            inputMode={inputMode}
            type={type}
          />
        )}
      </div>
    </div>
  )
}

export default Field
