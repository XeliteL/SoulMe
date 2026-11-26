import type { AnimeType } from "../model/types"

export const typeLabels: Record<AnimeType, string> = {
  film: "Фильм",
  serial: "Сериал",
  ova: "OVA",
  ona: "ONA",
  special: "Спешл",
}

export const typeKeys = Object.keys(typeLabels) as AnimeType[]
