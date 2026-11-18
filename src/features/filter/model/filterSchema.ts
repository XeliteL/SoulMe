import { z } from "zod"

import {
  ageRatings,
  type AnimeAgeRating,
  type AnimeGenre,
  type AnimeTag,
  type AnimeType,
  genreLabels,
  tagLabels,
  typeLabels,
} from "@/entities/anime"

import { type EpisodeRange, episodeRanges } from "../config/episodeRanges"
import {
  type RatingThreshold,
  ratingThresholds,
} from "../config/ratingThresholds"
import { sortKeys, sortOrders } from "../config/sortOptions"
import { type StatusOption, statusOptions } from "../config/statusOptions"
import { views } from "../config/viewOptions"

const ageRatingKeys = Object.keys(ageRatings) as AnimeAgeRating[]
const episodeRangeKeys = Object.keys(episodeRanges) as EpisodeRange[]
const ratingThresholdKeys = Object.keys(ratingThresholds) as RatingThreshold[]
const genreKeys = Object.keys(genreLabels) as AnimeGenre[]
const typeKeys = Object.keys(typeLabels) as AnimeType[]
const tagKeys = Object.keys(tagLabels) as AnimeTag[]
const statusKeys = Object.keys(statusOptions) as StatusOption[]

const optional = <T extends z.ZodType>(schema: T) =>
  schema.optional().catch(undefined)

const list = <T extends string>(values: readonly T[]) =>
  z
    .preprocess(
      (value) =>
        [value ?? []]
          .flat()
          .filter((item): item is T => values.includes(item as T)),
      z.array(z.enum(values)),
    )
    .transform((items) => (items.length > 0 ? items : undefined))
    .optional()

const MIN_YEAR = 1959

const year = optional(z.coerce.number().int().min(MIN_YEAR))

const filterSchema = z.object({
  collection: optional(z.string()),
  genre: list(genreKeys),
  yearFrom: year,
  yearTo: year,
  type: list(typeKeys),
  status: list(statusKeys),
  age: list(ageRatingKeys),
  episodes: list(episodeRangeKeys),
  rating: optional(z.enum(ratingThresholdKeys)),
  tag: list(tagKeys),
  order: optional(z.enum(sortOrders)),
  sort: optional(z.enum(sortKeys)),
  view: optional(z.enum(views)),
})

export type Filter = z.infer<typeof filterSchema>

const capYear = (value: number | undefined, maxYear: number) =>
  value !== undefined && value <= maxYear ? value : undefined

export const parseFilter = (
  params: Record<string, unknown>,
  now = new Date(),
): Filter => {
  const filter = filterSchema.parse(
    Object.fromEntries(
      Object.entries(params).filter(([, value]) => value !== ""),
    ),
  )
  const maxYear = now.getFullYear() + 1
  const yearFrom = capYear(filter.yearFrom, maxYear)
  const yearTo = capYear(filter.yearTo, maxYear)

  if (yearFrom !== undefined && yearTo !== undefined && yearFrom > yearTo) {
    return { ...filter, yearFrom: yearTo, yearTo: yearFrom }
  }

  return { ...filter, yearFrom, yearTo }
}
