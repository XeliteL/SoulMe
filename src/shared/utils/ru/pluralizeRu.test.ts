import { describe, expect, it } from "vitest"

import { pluralizeRu } from "./pluralizeRu"

const forms: [one: string, few: string, many: string] = [
  "серия",
  "серии",
  "серий",
]

describe("pluralizeRu", () => {
  it.each([
    [1, "серия"],
    [21, "серия"],
    [101, "серия"],
    [2, "серии"],
    [3, "серии"],
    [22, "серии"],
    [0, "серий"],
    [5, "серий"],
    [11, "серий"],
    [25, "серий"],
    [100, "серий"],
  ])("count %i -> '%s'", (count, expected) => {
    expect(pluralizeRu(count, forms)).toBe(`${count} ${expected}`)
  })
})
