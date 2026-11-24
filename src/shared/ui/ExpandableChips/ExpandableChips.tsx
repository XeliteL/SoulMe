"use client"

import { type ReactNode, useId, useLayoutEffect, useRef, useState } from "react"
import classNames from "classnames"

import { getVisibleCount } from "./lib/getVisibleCount"

import "./ExpandableChips.scss"

interface ExpandableChipsProps {
  className?: string
  items: { id: string; label: ReactNode }[]
  lines?: number
}

const ExpandableChips = ({
  className,
  items = [],
  lines = 2,
}: ExpandableChipsProps) => {
  const id = useId()
  const chipsRef = useRef<HTMLUListElement>(null)
  const measureRef = useRef<HTMLUListElement>(null)
  const [visibleCount, setVisibleCount] = useState(items.length)
  const [isExpanded, setIsExpanded] = useState(false)

  useLayoutEffect(() => {
    const list = chipsRef.current
    const measureList = measureRef.current
    if (!list || !measureList) return

    const entries = Array.from(measureList.children)
    const button = entries.pop()
    if (!button) return

    const measure = () => {
      const styles = getComputedStyle(list)
      const paddingLeft = Number.parseFloat(styles.paddingLeft) || 0
      const paddingRight = Number.parseFloat(styles.paddingRight) || 0
      const width = list.clientWidth - paddingLeft - paddingRight
      if (width < 0) return

      setVisibleCount(
        getVisibleCount(
          entries.map((entry) => entry.getBoundingClientRect().width),
          width,
          Number.parseFloat(styles.columnGap) || 0,
          lines,
          button.getBoundingClientRect().width,
        ),
      )
    }

    measure()

    const observer = new ResizeObserver(measure)
    observer.observe(list)
    entries.forEach((entry) => observer.observe(entry))
    observer.observe(button)

    return () => observer.disconnect()
  }, [items, lines])

  const visibleItems = isExpanded ? items : items.slice(0, visibleCount)
  const showToggle = visibleCount < items.length || isExpanded

  return (
    <div className="expandable-chips__container">
      <ul
        className={classNames(className, "expandable-chips")}
        ref={chipsRef}
        id={id}
      >
        {items &&
          visibleItems.map(({ id, label }) => (
            <li className="expandable-chips__item" key={id}>
              {label}
            </li>
          ))}
        {showToggle && (
          <li key={id}>
            <button
              className="expandable-chips__button"
              type="button"
              aria-expanded={isExpanded}
              aria-controls={id}
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "Скрыть" : "Ещё..."}
            </button>
          </li>
        )}
      </ul>
      <ul
        className="expandable-chips expandable-chips--measure"
        ref={measureRef}
        aria-hidden={true}
        inert
      >
        {items &&
          items.map(({ id, label }) => (
            <li className="expandable-chips__item" key={id}>
              {label}
            </li>
          ))}
        <li key={id}>
          <button className="expandable-chips__button" type="button">
            Ещё...
          </button>
        </li>
      </ul>
    </div>
  )
}

export default ExpandableChips
