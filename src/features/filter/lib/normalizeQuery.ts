export const normalizeQuery = (title: string) => {
  return title.toLocaleLowerCase().replaceAll("ё", "е").replace(/\s+/g, " ")
}
