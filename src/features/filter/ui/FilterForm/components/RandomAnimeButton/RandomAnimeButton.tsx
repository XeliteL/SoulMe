"use client"

import { useRouter } from "next/navigation"

import { getAnimeHref } from "@/entities/anime"
import Button from "@/shared/ui/Button"

interface RandomAnimeButtonProps {
  className?: string
  animeIds: string[]
}

const RandomAnimeButton = ({ className, animeIds }: RandomAnimeButtonProps) => {
  const router = useRouter()

  const handleClick = () => {
    const idx = Math.floor(Math.random() * animeIds.length)
    const id = animeIds[idx]

    if (id !== undefined) router.push(getAnimeHref(id))
  }

  return (
    <Button
      className={className}
      variant="black-10"
      iconName="cube"
      label="Случайное аниме"
      isLabelHidden
      disabled={animeIds.length === 0}
      onClick={handleClick}
    />
  )
}

export default RandomAnimeButton
