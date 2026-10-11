import type { SwiperOptions } from "swiper/types"

import { type Anime, animeItems } from "@/entities/anime"
import { type Category, categoryItems } from "@/entities/category"

import { specialSliderParams } from "./specialSliderParams"

interface collectionGroup {
  title: string
  children: Category[] | Anime[]
  badge?: string
  sliderParams?: SwiperOptions
  showReleaseDate?: boolean
  showRating?: boolean
  id: string
}

export const collectionGroups: collectionGroup[] = [
  {
    title: "Наши жанры",
    children: categoryItems,
    id: "genres",
  },
  {
    title: "Топ 10 в жанрах",
    children: categoryItems,
    badge: "Топ 10 в",
    sliderParams: specialSliderParams,
    id: "top",
  },
  {
    title: "Популярное",
    children: animeItems,
    id: "trends",
  },
  {
    title: "Новые релизы",
    children: animeItems,
    showReleaseDate: true,
    id: "new",
  },
  {
    title: "Обязательно посмотрите",
    children: animeItems,
    sliderParams: specialSliderParams,
    showRating: true,
    id: "recommendation",
  },
]
