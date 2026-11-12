export type SortKey = "rating" | "released" | "views" | "episodes" | "title"

export const sortOrders = ["asc", "desc"] as const
export type SortOrder = (typeof sortOrders)[number]

interface SortOption {
  label: string
  order: SortOrder
}

export const sortOptions: Record<SortKey, SortOption> = {
  rating: { label: "По рейтингу", order: "desc" },
  released: { label: "По дате релиза", order: "desc" },
  views: { label: "По популярности", order: "desc" },
  episodes: { label: "По количеству серий", order: "desc" },
  title: { label: "По названию", order: "asc" },
}
