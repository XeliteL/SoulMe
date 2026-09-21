import { categoryItems } from "@/sections/Categories/config/categoryItems"
import { AnimeItems } from "@/sections/Collections/config/animeItems"
import { specialSliderParams } from "@/sections/Collections/config/specialSliderParams"

interface CategoryItem {
  kind: "category"
  title: string
  images: string[]
  href: string
}

interface AnimeItemBase {
  kind: "anime"
  title: string
  imgSrc: string
  views: number
  released: {
    label: string
    dateTime: string
  }
  rating: {
    value: number
    label: number
  }
  href: string
}

type AnimeItem =
  | (AnimeItemBase & { type: "film"; duration: number })
  | (AnimeItemBase & { type: "serial"; episodes: number })

interface collectionGroup {
  title: string
  children: CategoryItem[] | AnimeItem[]
  badge?: string
  sliderParams?: object
  showReleaseDate?: boolean
  showRating?: boolean
}

export const collectionGroups: collectionGroup[] = [
  {
    title: "Наши жанры",
    children: categoryItems,
  },
  {
    title: "Топ 10 в жанрах",
    children: categoryItems,
    badge: "Топ 10 в",
    sliderParams: specialSliderParams,
  },
  {
    title: "Популярное",
    children: AnimeItems,
  },
  {
    title: "Новые релизы",
    children: AnimeItems,
    showReleaseDate: true,
  },
  {
    title: "Обязательно посмотрите",
    children: AnimeItems,
    sliderParams: specialSliderParams,
    showRating: true,
  },
]
