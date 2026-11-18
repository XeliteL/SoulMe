export type SortKey = "rating" | "released" | "views" | "episodes" | "title"

export const sortOrders = ["desc", "asc"] as const
export type SortOrder = (typeof sortOrders)[number]

interface SortOption {
  label: string
  order: SortOrder
}

export const sortOptions: Record<SortKey, SortOption> = {
  views: { label: "По популярности", order: "desc" },
  rating: { label: "По рейтингу", order: "desc" },
  episodes: { label: "По количеству серий", order: "desc" },
  released: { label: "По дате релиза", order: "desc" },
  title: { label: "По названию", order: "asc" },
}

export const sortKeys = Object.keys(sortOptions) as SortKey[]

export const orderLabels: Record<SortOrder, string> = {
  desc: "По убыванию",
  asc: "По возрастанию",
}

export const DEFAULT_SORT: SortKey = "views"
