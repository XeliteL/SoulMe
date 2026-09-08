export const ICON_NAMES = [
  "notification",
  "search",
  "telegram",
  "play",
  "arrow-right",
  "arrow-left",
] as const

export type IconName = (typeof ICON_NAMES)[number]
