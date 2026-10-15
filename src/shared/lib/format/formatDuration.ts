import type { Locale } from "@/shared/config/locale"

const UNITS: Record<Locale, { hours: string; minutes: string }> = {
  ru: { hours: "ч", minutes: "мин" },
  en: { hours: "h", minutes: "min" },
}

export const formatDuration = (value: number, locale: Locale) => {
  const { hours, minutes } = UNITS[locale]

  return `${Math.floor(value / 60)}${hours} ${value % 60}${minutes}`
}
