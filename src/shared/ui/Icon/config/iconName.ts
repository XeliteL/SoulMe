export const ICON_NAMES = [
  "notification",
  "search",
  "telegram",
  "play",
  "arrow-right",
  "arrow-left",
  "user",
  "like",
  "volume",
  "plus",
  "duration",
  "views",
  "catalog",
] as const

export type IconName = (typeof ICON_NAMES)[number]
