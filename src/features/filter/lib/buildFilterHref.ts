import { DEFAULT_SORT, sortOptions } from "../config/sortOptions"
import { DEFAULT_VIEW } from "../config/viewOptions"
import type { Filter } from "../model/filterSchema"

const FILTER_PATH = "/anime/filter"

export const buildFilterHref = (filter: Filter) => {
  const params = new URLSearchParams()
  const { sort, order, view, ...rest } = filter

  for (const [key, value] of Object.entries(rest)) {
    if (value === undefined) continue

    if (Array.isArray(value)) value.forEach((item) => params.append(key, item))
    else params.append(key, String(value))
  }

  if (sort && sort !== DEFAULT_SORT) params.append("sort", sort)

  if (order && order !== sortOptions[sort ?? DEFAULT_SORT].order) {
    params.append("order", order)
  }

  if (view && view !== DEFAULT_VIEW) params.append("view", view)

  const query = params.toString()

  return query ? `${FILTER_PATH}?${query}` : FILTER_PATH
}
