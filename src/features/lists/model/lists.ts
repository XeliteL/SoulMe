import type { IconName } from "@/shared/ui/Icon"

export type List = "bookmarks" | "favorites"

export const lists: Record<List, { label: string; iconName: IconName }> = {
  bookmarks: { label: "В закладки", iconName: "bookmark" },
  favorites: { label: "В избранное", iconName: "heart" },
}
