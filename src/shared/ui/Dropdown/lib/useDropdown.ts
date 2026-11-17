import { type KeyboardEvent } from "react"

import { useDisclosure } from "@/shared/lib/useDisclosure"

export const useDropdown = () => {
  const disclosure = useDisclosure<HTMLButtonElement>()
  const { buttonRef, isExpanded, close, ...rest } = disclosure

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (!isExpanded || event.key !== "Escape") return

    close()
    buttonRef.current?.focus()
  }

  return { ...rest, buttonRef, isExpanded, handleKeyDown }
}
