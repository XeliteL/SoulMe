interface CategoryItem {
  kind: "category"
  title: string
  images: string[]
  href: string
}

const IMAGES_PER_CATEGORY = 4

const categories: { title: string; slug: string }[] = [
  { title: "Сёнен", slug: "sonen" },
  { title: "Комедия", slug: "comedy" },
  { title: "Романтика", slug: "romantic" },
  { title: "Драма", slug: "drama" },
  { title: "Фэнтези", slug: "fantasy" },
  { title: "Музыка", slug: "music" },
  { title: "Исекай", slug: "isekai" },
  { title: "Сэйнен", slug: "seynen" },
  { title: "Экшен", slug: "action" },
  { title: "Сёдзё", slug: "syodze" },
  { title: "Фильмы", slug: "films" },
  { title: "Детектив", slug: "detective" },
  { title: "Меха", slug: "mecha" },
  { title: "Спорт", slug: "sport" },
  { title: "Хоррор", slug: "horror" },
]

export const categoryItems: CategoryItem[] = categories.map(
  ({ title, slug }) => ({
    kind: "category",
    title,
    images: Array.from(
      { length: IMAGES_PER_CATEGORY },
      (_, index) =>
        `/src/shared/assets/images/categories/${slug}/${index + 1}.png`,
    ),
    href: `/anime/${slug}`,
  }),
)
