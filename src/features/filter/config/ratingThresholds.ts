export type RatingThreshold = "6" | "7" | "8" | "9"

interface RatingThresholdConfig {
  label: string
  value: number
}

export const ratingThresholds: Record<RatingThreshold, RatingThresholdConfig> =
  {
    "6": { label: "Рейтинг от 6", value: 6 },
    "7": { label: "Рейтинг от 7", value: 7 },
    "8": { label: "Рейтинг от 8", value: 8 },
    "9": { label: "Рейтинг от 9", value: 9 },
  }
