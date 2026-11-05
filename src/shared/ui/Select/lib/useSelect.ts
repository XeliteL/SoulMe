import { type KeyboardEvent, useEffect, useRef, useState } from "react"

interface UseSelectParams {
  optionsCount: number
  initialIndex: number
}

export const useSelect = ({ optionsCount, initialIndex }: UseSelectParams) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(initialIndex)
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [side, setSide] = useState<"left" | "right">("left")

  const rootRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const open = () => {
    const { left } = buttonRef.current!.getBoundingClientRect()
    setSide(left < document.documentElement.clientWidth / 2 ? "left" : "right")
    setCurrentIndex(selectedIndex)
    setIsExpanded(true)
  }

  const close = () => setIsExpanded(false)

  const toggle = () => (isExpanded ? close() : open())

  const select = (index: number) => {
    setSelectedIndex(index)
    close()
    buttonRef.current?.focus()
  }

  useEffect(() => {
    if (!isExpanded) return

    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) close()
    }

    document.addEventListener("pointerdown", handlePointerDown)
    return () => document.removeEventListener("pointerdown", handlePointerDown)
  }, [isExpanded])

  useEffect(() => {
    if (!isExpanded) return

    dropdownRef.current?.children[currentIndex]?.scrollIntoView({
      block: "nearest",
    })
  }, [isExpanded, currentIndex])

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    const last = optionsCount - 1

    switch (event.key) {
      case "ArrowDown":
      case "ArrowUp": {
        event.preventDefault()
        if (!isExpanded) return open()
        const step = event.key === "ArrowDown" ? 1 : -1
        setCurrentIndex((prev) => Math.min(Math.max(prev + step, 0), last))
        break
      }
      case "Home":
      case "End":
        if (!isExpanded) return
        event.preventDefault()
        setCurrentIndex(event.key === "Home" ? 0 : last)
        break
      case "Enter":
      case " ":
        event.preventDefault()
        if (isExpanded) select(currentIndex)
        else open()
        break
      case "Escape":
        if (isExpanded) close()
        break
      case "Tab":
        if (isExpanded) select(currentIndex)
        break
    }
  }

  return {
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
  }
}
