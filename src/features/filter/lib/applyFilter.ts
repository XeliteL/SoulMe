import type { Anime } from "@/entities/anime"

import { type EpisodeRange, episodeRanges } from "../config/episodeRanges"
import { ratingThresholds } from "../config/ratingThresholds"
import type { Filter } from "../model/filterSchema"

const RECENT_MONTHS = 6

const getReleaseYears = (anime: Anime) =>
  anime.released ? Number(anime.released.dateTime.slice(0, 4)) : undefined

const isRecent = (anime: Anime, now: Date) => {
  if (!anime.released) return false

  const since = new Date(now)
  since.setMonth(since.getMonth() - RECENT_MONTHS)
  const released = new Date(anime.released.dateTime)

  return released >= since && released <= now
}

const matchesStatus = (
  anime: Anime,
  statuses: NonNullable<Filter["status"]>,
  now: Date,
) =>
  statuses.some((status) =>
    status === "recent" ? isRecent(anime, now) : anime.status === status,
  )

const matchesEpisodes = (anime: Anime, ranges: EpisodeRange[]) =>
  "episodes" in anime &&
  ranges.some((range) => {
    const { min, max } = episodeRanges[range]

    return anime.episodes >= min && anime.episodes <= max
  })

const matchesYears = (anime: Anime, { yearFrom, yearTo }: Filter) => {
  if (yearFrom == undefined && yearTo == undefined) return true

  const year = getReleaseYears(anime)

  return (
    year !== undefined &&
    year >= (yearFrom ?? -Infinity) &&
    year <= (yearTo ?? Infinity)
  )
}

export const applyFilter = (items: Anime[], filter: Filter, now = new Date()) =>
  items.filter(
    (anime) =>
      (!filter.genre ||
        filter.genre.some((genre) => anime.genres.includes(genre))) &&
      (!filter.type || filter.type.includes(anime.type)) &&
      (!filter.status || matchesStatus(anime, filter.status, now)) &&
      (!filter.age || filter.age.includes(anime.ageRating)) &&
      (!filter.tag || filter.tag.some((tag) => anime.tags?.includes(tag))) &&
      (!filter.episodes || matchesEpisodes(anime, filter.episodes)) &&
      (!filter.rating ||
        anime.rating.value >= ratingThresholds[filter.rating].value) &&
      matchesYears(anime, filter),
  )
