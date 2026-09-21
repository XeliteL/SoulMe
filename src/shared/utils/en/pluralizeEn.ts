const pluralRules = new Intl.PluralRules("en")

export const pluralizeEn = (
  count: number,
  [one, few, many]: [one: string, few: string, many: string],
) => {
  const category = pluralRules.select(count)
  const form = category === "one" ? one : category === "few" ? few : many

  return `${count} ${form}`
}
