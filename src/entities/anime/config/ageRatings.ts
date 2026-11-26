import type { AnimeAgeRating } from "../model/types"

export const ageRatings: Record<
  AnimeAgeRating,
  { label: string; description: string }
> = {
  g: { label: "G", description: "для всех возрастов" },
  pg: { label: "PG", description: "детям лучше смотреть с родителями" },
  "pg-13": { label: "PG-13", description: "не рекомендуется детям до 13 лет" },
  "r-17": { label: "R-17", description: "не рекомендуется лицам до 17 лет" },
  "r-plus": { label: "R+", description: "лицам до 17 лет просмотр запрещён" },
}

export const ageRatingKeys = Object.keys(ageRatings) as AnimeAgeRating[]
