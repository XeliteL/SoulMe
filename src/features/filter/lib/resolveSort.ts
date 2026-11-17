import { DEFAULT_SORT, sortOptions } from "../config/sortOptions"
import type { Filter } from "../model/filterSchema"

export const resolveSort = ({
  sort = DEFAULT_SORT,
  order,
}: Pick<Filter, "sort" | "order">) => ({
  sort,
  order: order ?? sortOptions[sort].order,
})
