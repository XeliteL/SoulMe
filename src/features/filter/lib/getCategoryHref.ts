import type { Category } from "@/entities/category"

import { type Filter, parseFilter } from "../model/filterSchema"
import { buildFilterHref } from "./buildFilterHref"

export const getCategoryHref = (category: Category, extra?: Filter) =>
  buildFilterHref(
    parseFilter({ ...category.filter, ...extra, collection: category.id }),
  )
