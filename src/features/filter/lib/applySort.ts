import type { Anime } from "@/entities/anime"

import type { SortKey } from "../config/sortOptions"
import type { Filter } from "../model/filterSchema"
import { resolveSort } from "./resolveSort"

type SortValue = number | string | undefined

const getValue: Record<SortKey, (anime: Anime) => SortValue> = {
  views: (anime) => anime.views,
  rating: (anime) =>
    anime.status === "announced" ? undefined : anime.rating.value,
  released: (anime) => anime.released?.dateTime,
  episodes: (anime) => ("episodes" in anime ? anime.episodes : undefined),
  title: (anime) => anime.title,
}

const compareValues = (a: string | number, b: string | number) =>
  typeof a === "string" && typeof b === "string"
    ? a.localeCompare(b, "ru")
    : Number(a) - Number(b)

export const applySort = (
  items: Anime[],
  filter: Pick<Filter, "sort" | "order">,
) => {
  const { sort, order } = resolveSort(filter)
  const sign = order === "asc" ? 1 : -1

  return items.toSorted((a, b) => {
    const valueA = getValue[sort](a)
    const valueB = getValue[sort](b)

    if (valueA === undefined && valueB === undefined) return 0
    if (valueA === undefined) return 1
    if (valueB === undefined) return -1

    return compareValues(valueA, valueB) * sign
  })
}
