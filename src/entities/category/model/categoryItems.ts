import type { Category, CategoryFilter } from "./types"

const categories: {
  title: string
  slug: string
  animeIds: [string, string, string, string]
  filter?: CategoryFilter
}[] = [
  {
    title: "Сёнен",
    slug: "shounen",
    animeIds: ["soul-eater", "dandadan", "one-piece", "bleach"],
  },
  {
    title: "Комедия",
    slug: "comedy",
    animeIds: ["grand-blue", "kaguya-sama", "one-punch-man", "spy-x-family"],
  },
  {
    title: "Романтика",
    slug: "romance",
    animeIds: [
      "chuunibyou",
      "my-dress-up-darling",
      "bunny-girl-senpai",
      "toradora",
    ],
  },
  {
    title: "Драма",
    slug: "drama",
    animeIds: [
      "violet-evergarden",
      "clannad-after-story",
      "plastic-memories",
      "5-centimeters-per-second",
    ],
  },
  {
    title: "Фэнтези",
    slug: "fantasy",
    animeIds: [
      "frieren",
      "delicious-in-dungeon",
      "howls-moving-castle",
      "goblin-slayer",
    ],
  },
  {
    title: "Музыка",
    slug: "music",
    animeIds: ["k-on", "bocchi-the-rock", "sound-euphonium", "beck"],
  },
  {
    title: "Исекай",
    slug: "isekai",
    animeIds: ["konosuba", "re-zero", "mushoku-tensei", "overlord"],
  },
  {
    title: "Сэйнен",
    slug: "seinen",
    animeIds: ["chainsaw-man-reze", "monster", "berserk", "tokyo-ghoul"],
  },
  {
    title: "Сёдзё",
    slug: "shoujo",
    animeIds: ["kamisama-kiss", "nana", "natsume-yuujinchou", "fruits-basket"],
  },
  {
    title: "Детектив",
    slug: "detective",
    animeIds: [
      "death-note",
      "ghost-in-the-shell",
      "psycho-pass",
      "bungo-stray-dogs",
    ],
  },
  {
    title: "Хоррор",
    slug: "horror",
    animeIds: ["devilman-crybaby", "hellsing-ultimate", "higurashi", "another"],
  },
]

export const categoryItems: Category[] = categories.map(
  ({ title, slug, animeIds, filter = { genre: [slug] } }) => ({
    kind: "category",
    id: slug,
    title,
    images: animeIds.map((animeId) => `/images/anime/${animeId}.webp`),
    filter,
  }),
)
