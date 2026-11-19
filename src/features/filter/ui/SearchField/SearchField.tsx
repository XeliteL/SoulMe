"use client"

import {
  type ChangeEvent,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react"
import classNames from "classnames"
import { useRouter } from "next/navigation"

import { useBaseId } from "@/shared/lib/useBaseId"
import Icon from "@/shared/ui/Icon"

import { buildFilterHref } from "../../lib/buildFilterHref"
import { type Filter, SEARCH_MAX_LENGTH } from "../../model/filterSchema"

import "./SearchField.scss"

const SEARCH_DELAY = 300

interface SearchFieldProps {
  className?: string
  filter: Filter
}

const SearchField = ({ className, filter }: SearchFieldProps) => {
  const id = useBaseId()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined)
  const search = filter.search ?? ""
  const [value, setValue] = useState(search)
  const [prevSearch, setPrevSearch] = useState(search)
  const [requestedSearch, setRequestedSearch] = useState(search)
  const inputRef = useRef<HTMLInputElement>(null)

  if (search !== prevSearch) {
    setPrevSearch(search)

    if (search !== requestedSearch) {
      setRequestedSearch(search)
      setValue(search)
    }
  }

  const navigate = (nextSearch: string) => {
    setRequestedSearch(nextSearch)
    startTransition(() => {
      router.replace(
        buildFilterHref({ ...filter, search: nextSearch || undefined }),
        { scroll: false },
      )
    })
  }

  useEffect(() => () => clearTimeout(timeoutRef.current), [])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value
    const nextSearch = nextValue.trim()

    setValue(nextValue)
    clearTimeout(timeoutRef.current)

    if (nextSearch === requestedSearch) return

    timeoutRef.current = setTimeout(() => {
      navigate(nextSearch)
    }, SEARCH_DELAY)
  }

  const handleClear = () => {
    clearTimeout(timeoutRef.current)
    setValue("")
    inputRef.current?.focus()

    if (requestedSearch !== "") navigate("")
  }

  return (
    <search
      className={classNames(className, "search-field", {
        "search-field--pending": isPending,
      })}
    >
      <Icon name="search" />
      <label className="visually-hidden" htmlFor={id}>
        Поиск по названию
      </label>
      <input
        className="search-field__input"
        id={id}
        ref={inputRef}
        type="search"
        value={value}
        onChange={handleChange}
        maxLength={SEARCH_MAX_LENGTH}
        enterKeyHint="search"
        autoComplete="off"
        placeholder="Поиск по названию"
      />
      {value !== "" && (
        <button
          className="search-field__clear"
          type="button"
          aria-label="Очистить поиск"
          onClick={handleClear}
        >
          <Icon name="close" />
        </button>
      )}
    </search>
  )
}

export default SearchField
