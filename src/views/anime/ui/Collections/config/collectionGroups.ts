import type { SwiperOptions } from "swiper/types"

import { type Anime, animeItems } from "@/entities/anime"
import { type Category, categoryItems } from "@/entities/category"

import { specialSliderParams } from "./specialSliderParams"

interface CollectionGroup {
  title: string
  items: Category[] | Anime[]
  badge?: string
  sliderParams?: SwiperOptions
  showReleaseDate?: boolean
  showRating?: boolean
  id: string
}

const COLLECTION_LIMIT = 10

export const collectionGroups: CollectionGroup[] = [
  {
    title: "Наши жанры",
    items: categoryItems,
    id: "genres",
  },
  {
    title: "Топ 10 в жанрах",
    items: categoryItems,
    badge: "Топ 10 в",
    sliderParams: specialSliderParams,
    id: "top",
  },
  {
    title: "Популярное",
    items: animeItems
      .toSorted((a, b) => b.views - a.views)
      .slice(0, COLLECTION_LIMIT),
    id: "trends",
  },
  {
    title: "Новые релизы",
    items: animeItems
      .filter((anime) => anime.status !== "announced")
      .toSorted((a, b) =>
        b.released.dateTime.localeCompare(a.released.dateTime),
      )
      .slice(0, COLLECTION_LIMIT),
    showReleaseDate: true,
    id: "new",
  },
  {
    title: "Обязательно посмотрите",
    items: animeItems
      .filter((anime) => anime.tags?.includes("must-watch"))
      .slice(0, COLLECTION_LIMIT),
    showRating: true,
    id: "recommendation",
  },
]
