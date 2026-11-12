"use client"

import { useState } from "react"

import Button from "@/shared/ui/Button"

import { type List, lists } from "../../model/lists"

interface ListToggleProps {
  animeId: string
  list: List
}

const ListToggle = ({ list }: ListToggleProps) => {
  const [isAdded, setIsAdded] = useState(false)
  const { label, iconName } = lists[list]

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

export default ListToggle
