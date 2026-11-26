export type EpisodeRange = "short" | "medium" | "long" | "very-long"

interface EpisodeRangeConfig {
  label: string
  description: string
  min: number
  max: number
}

export const episodeRanges: Record<EpisodeRange, EpisodeRangeConfig> = {
  short: { label: "Короткие", description: "до 13 серий", min: 1, max: 13 },
  medium: { label: "Средние", description: "14–26 серий", min: 14, max: 26 },
  long: { label: "Длинные", description: "27–100 серий", min: 27, max: 100 },
  "very-long": {
    label: "Сверхдлинные",
    description: "больше 100 серий",
    min: 101,
    max: Infinity,
  },
}

export const episodeRangeKeys = Object.keys(episodeRanges) as EpisodeRange[]
