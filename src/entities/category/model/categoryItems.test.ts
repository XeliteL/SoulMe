import { existsSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, it } from "vitest"

import { categoryItems } from "./categoryItems"

describe("categoryItems", () => {
  it("ссылается только на существующие постеры", () => {
    const images = categoryItems.flatMap((category) => category.images)

    for (const image of images) {
      expect(existsSync(join(process.cwd(), "public", image)), image).toBe(true)
    }
  })

  it("не повторяет постеры между категориями", () => {
    const images = categoryItems.flatMap((category) => category.images)

    expect(new Set(images).size).toBe(images.length)
  })
})
