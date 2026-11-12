import { sortOptions } from "../config/sortOptions"
import type { Filter } from "../model/filterSchema"

const FILTER_PATH = "/anime/filter"

export const buildFilterHref = (filter: Filter) => {
  const params = new URLSearchParams()
  const { order, ...rest } = filter

  for (const [key, value] of Object.entries(rest)) {
    if (value === undefined) continue

    if (Array.isArray(value)) value.forEach((item) => params.append(key, item))
    else params.append(key, String(value))
  }

  if (filter.sort && order && order !== sortOptions[filter.sort].order) {
    params.append("order", order)
  }

  const query = params.toString()

  return query ? `${FILTER_PATH}?${query}` : FILTER_PATH
}
