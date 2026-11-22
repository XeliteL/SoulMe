import { useEffect, useState } from "react"

import { useDropdown } from "@/shared/ui/Dropdown/lib/useDropdown"

import type { Bookmark } from "../../../model/bookmarks"

export const useBookmarkMenu = () => {
  const dropdown = useDropdown()
  const { rootRef, isExpanded, close } = dropdown
  const [bookmark, setBookmark] = useState<Bookmark | null>(null)

  useEffect(() => {
    if (!isExpanded) return

    const boundary = rootRef.current?.closest("[data-dropdown-boundary]")
    if (!boundary) return

    const handlePointerLeave = (event: Event) => {
      if ((event as PointerEvent).pointerType === "mouse") close()
    }

    boundary.addEventListener("pointerleave", handlePointerLeave)
    return () =>
      boundary.removeEventListener("pointerleave", handlePointerLeave)
  }, [isExpanded, rootRef, close])

  const handleMainClick = () => {
    if (bookmark) dropdown.toggle()
    else setBookmark({})
  }

  return {
    ...dropdown,
    bookmark,
    setBookmark,
    handleMainClick,
  }
}
