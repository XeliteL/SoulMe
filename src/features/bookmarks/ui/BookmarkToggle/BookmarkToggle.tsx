"use client"

import { useState } from "react"

import Button from "@/shared/ui/Button"

import { type BookmarkView, bookmarkView } from "../../model/bookmarks"

interface BookmarkToggleProps {
  animeId: string
  view: BookmarkView
}

const BookmarkToggle = ({ view }: BookmarkToggleProps) => {
  const [isAdded, setIsAdded] = useState(false)
  const { label, iconName } = bookmarkView[view]

  return (
    <Button
      variant="black-06"
      iconName={iconName}
      label={label}
      isLabelHidden
      isPressed={isAdded}
      onClick={() => setIsAdded(!isAdded)}
    />
  )
}

export default BookmarkToggle
