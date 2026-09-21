const pluralRules = new Intl.PluralRules("ru")

export const pluralizeRu = (
  count: number,
  [one, few, many]: [one: string, few: string, many: string],
) => {
  const category = pluralRules.select(count)
  const form = category === "one" ? one : category === "few" ? few : many

  return `${count} ${form}`
}
