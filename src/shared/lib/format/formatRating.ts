import type { Locale } from "@/shared/config/locale"

const options: Intl.NumberFormatOptions = {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
}

const formatters: Record<Locale, Intl.NumberFormat> = {
  ru: new Intl.NumberFormat("ru", options),
  en: new Intl.NumberFormat("en", options),
}

export const formatRating = (value: number, locale: Locale) =>
  formatters[locale].format(value)
