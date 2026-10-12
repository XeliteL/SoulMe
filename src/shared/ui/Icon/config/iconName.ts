export const ICON_NAMES = [
  "notification",
  "search",
  "telegram",
  "github",
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
  "check",
  "chevron-down",
] as const

export type IconName = (typeof ICON_NAMES)[number]
