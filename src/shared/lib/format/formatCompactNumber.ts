import type { Locale } from "@/shared/config/locale"

const formatters: Record<Locale, Intl.NumberFormat> = {
  ru: new Intl.NumberFormat("ru", {
    notation: "compact",
  }),
  en: new Intl.NumberFormat("en", {
    notation: "compact",
  }),
}

export const formatCompactNumber = (value: number, locale: Locale) =>
  formatters[locale].format(value)
