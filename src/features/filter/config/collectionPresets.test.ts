import { describe, expect, it } from "vitest"

import { categoryItems } from "@/entities/category"

import { parseFilter } from "../model/filterSchema"
import { collectionPresets } from "./collectionPresets"

describe("collectionPresets", () => {
  it.each(Object.entries(collectionPresets))(
    "фильтр пресета %s проходит разбор без потерь",
    (_, { filter }) => {
      expect(parseFilter(filter)).toEqual(filter)
    },
  )

  it("не пересекается с id категорий", () => {
    const categoryIds = categoryItems.map((category) => category.id)

    for (const key of Object.keys(collectionPresets)) {
      expect(categoryIds, key).not.toContain(key)
    }
  })
})
