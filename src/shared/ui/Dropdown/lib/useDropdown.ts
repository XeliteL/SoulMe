import { type KeyboardEvent, type MouseEvent } from "react"

import { useDisclosure } from "@/shared/lib/useDisclosure"

export const useDropdown = () => {
  const disclosure = useDisclosure<HTMLButtonElement>()
  const { buttonRef, isExpanded, close, ...rest } = disclosure

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (!isExpanded || event.key !== "Escape") return

    close()
    buttonRef.current?.focus()
  }

  const handlePanelClick = (event: MouseEvent<HTMLElement>) => {
    if (!(event.target as Element).closest("a, button")) return

    close()
    buttonRef.current?.focus()
  }

  return { ...rest, buttonRef, isExpanded, handleKeyDown, handlePanelClick }
}
