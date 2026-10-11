import classNames from "classnames"

import { useSelect } from "./useSelect"

import "./Select.scss"

interface SelectProps {
  // обязателен: Select всегда остров, а useId на сервере и в острове даёт разные id
  id: string
  name?: string
  label: string
  isLabelHidden?: boolean
  options: SelectOption[]
  buttonClassName?: string
}

export interface SelectOption {
  value: string
  isSelected?: boolean
}

const Select = ({
  id,
  name,
  label,
  isLabelHidden = true,
  options,
  buttonClassName,
}: SelectProps) => {
  const IDs = {
    control: `${id}-select`,
    label: `${id}-label`,
    dropdown: `${id}-dropdown`,
  }
  const getOptionId = (index: number) => `${id}-option-${index}`

  const initialIndex = Math.max(
    options.findIndex((option) => option.isSelected),
    0,
  )

  const {
    rootRef,
    buttonRef,
    dropdownRef,
    isExpanded,
    selectedIndex,
    currentIndex,
    side,
    toggle,
    select,
    setCurrentIndex,
    setSelectedIndex,
    handleKeyDown,
  } = useSelect({ optionsCount: options.length, initialIndex })

  return (
    <div className="select" ref={rootRef}>
      <label
        className={classNames("select__label", {
          "visually-hidden": isLabelHidden,
        })}
        id={IDs.label}
        htmlFor={IDs.control}
      >
        {label}
      </label>
      <select
        className={classNames("select__original-control", buttonClassName)}
        id={IDs.control}
        name={name}
        tabIndex={-1}
        value={options[selectedIndex].value}
        onChange={(event) => setSelectedIndex(event.target.selectedIndex)}
      >
        {options.map(({ value }) => (
          <option value={value} key={value}>
            {value}
          </option>
        ))}
      </select>
      <div className="select__body">
        <div
          className={classNames("select__button", buttonClassName, {
            "is-expanded": isExpanded,
          })}
          ref={buttonRef}
          role="combobox"
          aria-expanded={isExpanded}
          aria-haspopup="listbox"
          aria-controls={IDs.dropdown}
          aria-labelledby={IDs.label}
          aria-activedescendant={
            isExpanded ? getOptionId(currentIndex) : undefined
          }
          tabIndex={0}
          onClick={toggle}
          onKeyDown={handleKeyDown}
        >
          {options[selectedIndex].value}
        </div>
        <div
          className={classNames("select__dropdown", `is-on-${side}-side`, {
            "is-expanded": isExpanded,
          })}
          ref={dropdownRef}
          id={IDs.dropdown}
          role="listbox"
          aria-labelledby={IDs.label}
        >
          {options.map(({ value }, index) => (
            <div
              className={classNames("select__option", {
                "is-selected": index === selectedIndex,
                "is-current": isExpanded && index === currentIndex,
              })}
              id={getOptionId(index)}
              role="option"
              aria-selected={index === selectedIndex}
              onClick={() => select(index)}
              onMouseEnter={() => setCurrentIndex(index)}
              key={value}
            >
              {value}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Select
