"use client"

import { useState } from "react"

import Button from "@/shared/ui/Button"

import { type AnimeList, animeLists } from "../../model/animeLists"

interface AnimeListToggleProps {
  animeId: string
  list: AnimeList
}

const AnimeListToggle = ({ list }: AnimeListToggleProps) => {
  const [isAdded, setIsAdded] = useState(false)
  const { label, iconName } = animeLists[list]

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

export default AnimeListToggle
