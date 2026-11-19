import type { IconName } from "@/shared/ui/Icon"

export type Marker = "watching" | "planned" | "completed" | "favorite"

export interface Bookmark {
  marker?: Marker
}

export type BookmarkView = Marker | "bookmarks"

export const bookmarkView: Record<
  BookmarkView,
  { label: string; iconName: IconName }
> = {
  bookmarks: { label: "В закладках", iconName: "bookmark" },
  watching: { label: "Смотрю", iconName: "eye" },
  planned: { label: "В планах", iconName: "archive" },
  completed: { label: "Просмотрено", iconName: "check" },
  favorite: { label: "Любимые", iconName: "heart" },
}

export const bookmarkViewKeys: BookmarkView[] = [
  "bookmarks",
  "watching",
  "planned",
  "completed",
  "favorite",
]

export const getBookmarkView = (bookmark: Bookmark): BookmarkView =>
  bookmark.marker ?? "bookmarks"

export const toBookmark = (view: BookmarkView): Bookmark =>
  view === "bookmarks" ? {} : { marker: view }
