import { useState } from "react"

import { useDropdown } from "@/shared/ui/Dropdown/lib/useDropdown"

import type { Bookmark } from "../../../model/bookmarks"

export const useBookmarkMenu = () => {
  const dropdown = useDropdown()
  const [bookmark, setBookmark] = useState<Bookmark | null>(null)

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
