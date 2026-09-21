const compactNumberFormat = new Intl.NumberFormat("ru", {
  notation: "compact",
})

export const formatCompactNumberRu = (value: number) =>
  compactNumberFormat.format(value)
