"use client"

import {
  type CSSProperties,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react"
import classNames from "classnames"

import "./ExpandableText.scss"

interface ExpandableTextProps {
  className?: string
  text: string
  lines: number
}

const ExpandableText = ({ className, text, lines }: ExpandableTextProps) => {
  const id = useId()
  const textRef = useRef<HTMLParagraphElement>(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isOverflowing, setIsOverflowing] = useState(false)

  useLayoutEffect(() => {
    const el = textRef.current
    if (!el) return

    const observer = new ResizeObserver(() => {
      setIsOverflowing(el.scrollHeight > el.clientHeight)
    })
    observer.observe(el)

    return () => observer.disconnect()
  }, [text, lines])

  return (
    <div
      className={classNames(className, "expandable-text", {
        "is-expanded": isExpanded,
      })}
    >
      <p
        className="expandable-text__text"
        id={id}
        ref={textRef}
        style={{ "--expandableTextLines": lines } as CSSProperties}
      >
        {text}
      </p>
      {(isOverflowing || isExpanded) && (
        <button
          className="expandable-text__button"
          type="button"
          aria-expanded={isExpanded}
          aria-controls={id}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Скрыть" : "Подробнее"}
        </button>
      )}
    </div>
  )
}

export default ExpandableText
