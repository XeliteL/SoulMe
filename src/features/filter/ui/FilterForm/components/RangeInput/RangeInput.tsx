"use client"
import { useRef } from "react"
import classNames from "classnames"

import "./RangeInput.scss"

interface RangeInputProps {
  className?: string
  name: string
  ariaLabel: string
  defaultValue?: number
  min?: number
  max?: number
  step?: number
  stepCount?: number
  placeholder?: string
}

const RangeInput = ({
  className,
  name,
  ariaLabel,
  defaultValue,
  min,
  max,
  step,
  stepCount,
  placeholder,
}: RangeInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="range-input">
      <input
        className={classNames(className, "range-input__input")}
        type="number"
        name={name}
        aria-label={ariaLabel}
        defaultValue={defaultValue}
        min={min}
        max={max}
        step={step}
        placeholder={placeholder}
        ref={inputRef}
      />
      <div className="range-input__buttons">
        <button
          className="range-input__button"
          type="button"
          aria-label={`Увеличить значение поля ${ariaLabel}`}
          onClick={() => inputRef.current?.stepUp(stepCount)}
        >
          <span aria-hidden="true">▴</span>
        </button>
        <button
          className="range-input__button"
          type="button"
          aria-label={`Уменьшить значение поля ${ariaLabel}`}
          onClick={() => inputRef.current?.stepDown(stepCount)}
        >
          <span aria-hidden="true">▾</span>
        </button>
      </div>
    </div>
  )
}

export default RangeInput
