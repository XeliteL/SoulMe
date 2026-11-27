import type { AnimeTag } from "../model/types"

export const tagLabels: Record<AnimeTag, string> = {
  "must-watch": "Обязательно посмотрите",
}

export const tagKeys = Object.keys(tagLabels) as AnimeTag[]
