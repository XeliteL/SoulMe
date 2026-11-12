export interface CategoryFilter {
  genre?: string[]
  type?: string[]
}

export interface Category {
  kind: "category"
  id: string
  title: string
  images: string[]
  filter: CategoryFilter
}
