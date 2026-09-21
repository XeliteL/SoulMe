import { describe, expect, it } from "vitest"

import { pluralizeEn } from "./pluralizeEn"

const forms: [one: string, few: string, many: string] = [
  "item",
  "items-few",
  "items",
]

describe("pluralizeEn", () => {
  it("uses the singular form for 1", () => {
    expect(pluralizeEn(1, forms)).toBe("1 item")
  })

  it.each([0, 2, 5, 11, 21, 100])(
    "uses the plural form for %i (English has no separate 'few')",
    (count) => {
      expect(pluralizeEn(count, forms)).toBe(`${count} items`)
    },
  )
})
