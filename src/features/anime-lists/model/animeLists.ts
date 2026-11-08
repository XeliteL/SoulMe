import type { IconName } from "@/shared/ui/Icon"

export type AnimeList = "bookmarks" | "favorites"

export const animeLists: Record<
  AnimeList,
  { label: string; iconName: IconName }
> = {
  bookmarks: { label: "В закладки", iconName: "bookmark" },
  favorites: { label: "В избранное", iconName: "heart" },
}
