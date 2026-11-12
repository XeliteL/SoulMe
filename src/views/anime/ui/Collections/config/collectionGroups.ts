import type { SwiperOptions } from "swiper/types"

import { type Anime, animeItems, tagLabels } from "@/entities/anime"
import { type Category, categoryItems } from "@/entities/category"
import type { Filter } from "@/features/filter"

import { specialSliderParams } from "./specialSliderParams"

interface CollectionGroup {
  title: string
  items: Category[] | Anime[]
  badge?: string
  categoryFilter?: Filter
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
    title: "Лучшие в жанрах",
    items: categoryItems,
    badge: "Лучшее",
    categoryFilter: { sort: "rating" },
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
    title: tagLabels["must-watch"],
    items: animeItems
      .filter((anime) => anime.tags?.includes("must-watch"))
      .slice(0, COLLECTION_LIMIT),
    showRating: true,
    id: "recommendation",
  },
]
