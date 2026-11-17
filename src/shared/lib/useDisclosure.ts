import { useEffect, useRef, useState } from "react"

export const useDisclosure = <T extends HTMLElement>() => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [side, setSide] = useState<"left" | "right">("right")

  const buttonRef = useRef<T>(null)
  const rootRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const open = () => {
    const { left } = buttonRef.current!.getBoundingClientRect()
    const width = dropdownRef.current!.offsetWidth
    setSide(
      left + width < document.documentElement.clientWidth ? "left" : "right",
    )
    setIsExpanded(true)
  }

  const close = () => setIsExpanded(false)

  const toggle = () => (isExpanded ? close() : open())

  useEffect(() => {
    if (!isExpanded) return

    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) close()
    }

    document.addEventListener("pointerdown", handlePointerDown)
    return () => document.removeEventListener("pointerdown", handlePointerDown)
  }, [isExpanded])

  return {
    rootRef,
    buttonRef,
    dropdownRef,
    isExpanded,
    side,
    open,
    close,
    toggle,
  }
}
