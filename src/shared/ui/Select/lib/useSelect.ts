import { type KeyboardEvent, useEffect, useState } from "react"

import { useDisclosure } from "@/shared/lib/useDisclosure"

interface UseSelectParams {
  optionsCount: number
  initialIndex: number
}

export const useSelect = ({ optionsCount, initialIndex }: UseSelectParams) => {
  const disclosure = useDisclosure<HTMLDivElement>()
  const { rootRef, buttonRef, dropdownRef, isExpanded, side, close } =
    disclosure

  const [selectedIndex, setSelectedIndex] = useState(initialIndex)
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  const open = () => {
    setCurrentIndex(selectedIndex)
    disclosure.open()
  }

  const toggle = () => (isExpanded ? close() : open())

  const select = (index: number) => {
    setSelectedIndex(index)
    close()
    buttonRef.current?.focus()
  }

  useEffect(() => {
    if (!isExpanded) return

    dropdownRef.current?.children[currentIndex]?.scrollIntoView({
      block: "nearest",
    })
  }, [isExpanded, currentIndex, dropdownRef])

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
