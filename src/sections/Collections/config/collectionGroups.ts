import type { SwiperOptions } from "swiper/types"

import {
  type CategoryItem,
  categoryItems,
} from "@/sections/Categories/config/categoryItems"
import {
  type AnimeItem,
  AnimeItems,
} from "@/sections/Collections/config/animeItems"
import { specialSliderParams } from "@/sections/Collections/config/specialSliderParams"

interface collectionGroup {
  title: string
  children: CategoryItem[] | AnimeItem[]
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
    children: AnimeItems,
    id: "trends",
  },
  {
    title: "Новые релизы",
    children: AnimeItems,
    showReleaseDate: true,
    id: "new",
  },
  {
    title: "Обязательно посмотрите",
    children: AnimeItems,
    sliderParams: specialSliderParams,
    showRating: true,
    id: "recommendation",
  },
]
