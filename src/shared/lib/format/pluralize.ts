import type { Locale } from "@/shared/config/locale"

const pluralRules: Record<Locale, Intl.PluralRules> = {
  ru: new Intl.PluralRules("ru"),
  en: new Intl.PluralRules("en"),
}

const numberFormats: Record<Locale, Intl.NumberFormat> = {
  ru: new Intl.NumberFormat("ru"),
  en: new Intl.NumberFormat("en"),
}

type PluralForms = Partial<Record<Intl.LDMLPluralRule, string>> & {
  other: string
}

export const pluralize = (count: number, forms: PluralForms, locale: Locale) =>
  `${numberFormats[locale].format(count)} ${forms[pluralRules[locale].select(count)] ?? forms.other}`
