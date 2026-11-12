import { describe, expect, it } from "vitest"

import { type Category, categoryItems } from "@/entities/category"

import { parseFilter } from "../model/filterSchema"
import { getCategoryHref } from "./getCategoryHref"

const createCategory = (id: string, filter: Category["filter"]): Category => ({
  kind: "category",
  id,
  title: id,
  images: [],
  filter,
})

describe("getCategoryHref", () => {
  it("ведёт в фильтр с коллекцией и жанром", () => {
    expect(
      getCategoryHref(createCategory("comedy", { genre: ["comedy"] })),
    ).toBe("/anime/filter?collection=comedy&genre=comedy")
  })

  it("переносит тип", () => {
    expect(getCategoryHref(createCategory("films", { type: ["film"] }))).toBe(
      "/anime/filter?collection=films&type=film",
    )
  })

  it("добавляет дополнительный фильтр", () => {
    expect(
      getCategoryHref(createCategory("comedy", { genre: ["comedy"] }), {
        sort: "rating",
      }),
    ).toBe("/anime/filter?collection=comedy&genre=comedy&sort=rating")
  })

  it.each(categoryItems.map((category) => [category.id, category.filter]))(
    "фильтр категории %s проходит разбор без потерь",
    (_, filter) => {
      expect(parseFilter({ ...filter })).toEqual(filter)
    },
  )
})
