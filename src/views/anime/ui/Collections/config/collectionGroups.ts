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
    items: animeItems,
    id: "trends",
  },
  {
    title: "Новые релизы",
    items: animeItems,
    showReleaseDate: true,
    id: "new",
  },
  {
    title: "Обязательно посмотрите",
    items: animeItems,
    sliderParams: specialSliderParams,
    showRating: true,
    id: "recommendation",
  },
]
