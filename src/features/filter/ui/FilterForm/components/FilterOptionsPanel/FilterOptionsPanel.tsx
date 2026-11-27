import { useState } from "react"

import { useBaseId } from "@/shared/lib/useBaseId"
import Button from "@/shared/ui/Button"
import Icon from "@/shared/ui/Icon"
import TristateCheckbox, { type TriState } from "@/shared/ui/TristateCheckbox"

import { normalizeQuery } from "../../../../lib/normalizeQuery"
import PanelButton from "../../components/PanelButton"

import "./FilterOptionsPanel.scss"

interface FilterOptionsPanelProps {
  label: string
  options: {
    id: string
    label: string
    state: TriState
    setState: (state: TriState) => void
  }[]
  placeholder?: string
  onBack: () => void
}

const FilterOptionsPanel = ({
  label,
  options,
  placeholder,
  onBack,
}: FilterOptionsPanelProps) => {
  const titleId = useBaseId()
  const searchPlaceholder = `Поиск по ${placeholder ?? label.toLowerCase()}`

  const [query, setQuery] = useState("")
  const normalizedQuery = normalizeQuery(query.trim())
  const visibleOptions = options.filter(({ label }) =>
    normalizeQuery(label).includes(normalizedQuery),
  )

  const handleClear = () => {
    setQuery("")
  }

  return (
    <section className="filter-options-panel" aria-labelledby={titleId}>
      <header className="filter-options-panel__header">
        <h2 className="visually-hidden" id={titleId}>
          {label}
        </h2>
        <PanelButton label={label} direction="back" onClick={onBack} />
        <Button
          className="filter-options-panel__button"
          variant="transparent"
          label="Сбросить"
        />
      </header>
      <div className="filter-options-panel__search">
        <input
          className="filter-options-panel__search-input"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          aria-label={searchPlaceholder}
          placeholder={searchPlaceholder}
          onKeyDown={(event) => {
            if (event.key === "Enter") event.preventDefault()
          }}
        />
        {query !== "" && (
          <button
            className="filter-options-panel__search-clear"
            type="button"
            aria-label="Очистить поиск"
            onClick={handleClear}
          >
            <Icon name="close" />
          </button>
        )}
      </div>
      <ul className="filter-options-panel__list">
        {visibleOptions.map((item) => (
          <li key={item.id}>
            <TristateCheckbox
              label={item.label}
              state={item.state}
              onStateChange={item.setState}
            />
          </li>
        ))}
      </ul>
      <footer className="filter-options-panel__footer">
        <Button
          className="filter-options-panel__submit-button"
          label="Выбрать"
          onClick={onBack}
        />
      </footer>
    </section>
  )
}

export default FilterOptionsPanel
