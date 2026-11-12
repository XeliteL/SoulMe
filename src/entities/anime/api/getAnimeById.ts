import { animeItems } from "./animeItems"

export const getAnimeById = (id: string) =>
  animeItems.find((anime) => anime.id === id)
