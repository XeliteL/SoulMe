import { HTMLInputAutoCompleteAttribute, ReactNode } from "react"
import classNames from "classnames"

import { useBaseId } from "@/shared/lib/useBaseId"

import MaskedInput from "./components/MaskedInput"

import "./Field.scss"

interface FieldProps {
  className?: string
  id?: string
  label: string
  name: string
  type?: "email" | "textarea" | "password"
  placeholder: string
  isRequired?: boolean
  hasRequiredMark?: boolean
  error?: string
  defaultValue?: string
  hint?: string
  inputMode?: "tel"
  mask?: string
  autoComplete?: HTMLInputAutoCompleteAttribute
  renderBefore?: (controlClassName: string) => ReactNode
}

const Field = ({
  className,
  id,
  label,
  name,
  type,
  placeholder,
  isRequired,
  hasRequiredMark = true,
  error,
  defaultValue,
  hint,
  inputMode,
  mask,
  autoComplete,
  renderBefore,
}: FieldProps) => {
  const baseId = useBaseId(id)
  const controlId = `${baseId}-field`
  const errorId = `${baseId}-error`
  const hintId = `${baseId}-hint`

  const describedBy =
    [error && errorId, hint && hintId].filter(Boolean).join(" ") || undefined

  const controlProps = {
    className: "field__control",
    id: controlId,
    name,
    placeholder,
    required: isRequired,
    autoComplete,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy,
    defaultValue,
  }

  return (
    <div
      className={classNames(className, "field", {
        "field--invalid": error,
      })}
    >
      <label className="field__label" htmlFor={controlId}>
        {label}
        {isRequired && hasRequiredMark && (
          <>
            {" "}
            <span className="field__required-star" aria-hidden="true">
              *
            </span>
          </>
        )}
      </label>
      <div className="field__body">
        {renderBefore?.("field__control")}
        {type === "textarea" ? (
          <textarea {...controlProps} />
        ) : mask ? (
          <MaskedInput {...controlProps} inputMode={inputMode} mask={mask} />
        ) : (
          <input {...controlProps} type={type} inputMode={inputMode} />
        )}
      </div>
      {hint && (
        <p className="field__hint" id={hintId}>
          {hint}
        </p>
      )}
      {error && (
        <p className="field__error" id={errorId}>
          {error}
        </p>
      )}
    </div>
  )
}

export default Field
