import { z } from "zod"

import { ageRatingKeys, genreKeys, tagKeys, typeKeys } from "@/entities/anime"

import { episodeRangeKeys } from "../config/episodeRanges"
import { sortKeys, sortOrders } from "../config/sortOptions"
import { statusKeys } from "../config/statusOptions"
import { views } from "../config/viewOptions"

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
export const SEARCH_MAX_LENGTH = 100

const year = optional(z.coerce.number().int().min(MIN_YEAR))
const duration = optional(z.coerce.number().int().min(1))
const rating = optional(z.coerce.number().min(0).max(10))
const reviews = optional(z.coerce.number().int().min(0))

const filterSchema = z.object({
  collection: optional(z.string()),
  genre: list(genreKeys),
  type: list(typeKeys),
  status: list(statusKeys),
  age: list(ageRatingKeys),
  episodes: list(episodeRangeKeys),
  tag: list(tagKeys),
  yearFrom: year,
  yearTo: year,
  durationFrom: duration,
  durationTo: duration,
  ratingFrom: rating,
  ratingTo: rating,
  reviewsFrom: reviews,
  reviewsTo: reviews,
  order: optional(z.enum(sortOrders)),
  sort: optional(z.enum(sortKeys)),
  view: optional(z.enum(views)),
  search: optional(z.string().trim().min(1).max(SEARCH_MAX_LENGTH)),
})

export type Filter = z.infer<typeof filterSchema>

const capYear = (value: number | undefined, maxYear: number) =>
  value !== undefined && value <= maxYear ? value : undefined

const normalizeRange = (
  from: number | undefined,
  to: number | undefined,
): [number | undefined, number | undefined] =>
  from !== undefined && to !== undefined && from > to ? [to, from] : [from, to]

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

  const [yearFrom, yearTo] = normalizeRange(
    capYear(filter.yearFrom, maxYear),
    capYear(filter.yearTo, maxYear),
  )
  const [ratingFrom, ratingTo] = normalizeRange(
    filter.ratingFrom,
    filter.ratingTo,
  )
  const [durationFrom, durationTo] = normalizeRange(
    filter.durationFrom,
    filter.durationTo,
  )
  const [reviewsFrom, reviewsTo] = normalizeRange(
    filter.reviewsFrom,
    filter.reviewsTo,
  )

  return {
    ...filter,
    yearFrom,
    yearTo,
    durationFrom,
    durationTo,
    ratingFrom,
    ratingTo,
    reviewsFrom,
    reviewsTo,
  }
}
