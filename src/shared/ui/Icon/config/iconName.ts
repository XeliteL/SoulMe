export const ICON_NAMES = [
  "arrow-left",
  "arrow-right",
  "catalog",
  "check",
  "chevron-down",
  "duration",
  "eye",
  "eye-off",
  "github",
  "like",
  "notification",
  "play",
  "plus",
  "search",
  "telegram",
  "user",
  "views",
  "volume",
] as const

export type IconName = (typeof ICON_NAMES)[number]
