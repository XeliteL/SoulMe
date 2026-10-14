import { ReactNode } from "react"
import classNames from "classnames"

import { useBaseId } from "@/shared/lib/useBaseId"

import MaskedInput from "./components/MaskedInput"

import "./Field.scss"

interface FieldProps {
  className?: string
  id?: string
  label: string
  name: string
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
  name,
  type,
  placeholder,
  isRequired,
  inputMode,
  mask,
  renderBefore,
}: FieldProps) => {
  const baseId = useBaseId(id)
  const controlId = `${baseId}-field`

  const controlProps = {
    className: "field__control",
    id: controlId,
    name,
    placeholder,
    required: isRequired,
  }

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
        {type === "textarea" ? (
          <textarea {...controlProps} />
        ) : mask ? (
          <MaskedInput {...controlProps} inputMode={inputMode} mask={mask} />
        ) : (
          <input {...controlProps} type={type} inputMode={inputMode} />
        )}
      </div>
    </div>
  )
}

export default Field
