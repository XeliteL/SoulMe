const compactNumberFormat = new Intl.NumberFormat("en", {
  notation: "compact",
})

export const formatCompactNumberEn = (value: number) =>
  compactNumberFormat.format(value)
