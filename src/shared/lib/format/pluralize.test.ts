import { describe, expect, it } from "vitest"

import { pluralize } from "./pluralize"

const formsRu = { one: "серия", few: "серии", many: "серий", other: "серии" }

const formsEn = { one: "item", other: "items" }

const formatRu = new Intl.NumberFormat("ru")
const formatEn = new Intl.NumberFormat("en")

describe("pluralize", () => {
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
    [12, "серий"],
    [14, "серий"],
    [25, "серий"],
    [100, "серий"],
    [111, "серий"],
    [112, "серий"],
    [1.5, "серии"],
  ])("formats %d as '%s' in ru", (count, expected) => {
    expect(pluralize(count, formsRu, "ru")).toBe(
      `${formatRu.format(count)} ${expected}`,
    )
  })

  it.each([
    [1, "item"],
    [0, "items"],
    [2, "items"],
    [5, "items"],
    [11, "items"],
    [21, "items"],
    [100, "items"],
  ])("formats %d as '%s' in en", (count, expected) => {
    expect(pluralize(count, formsEn, "en")).toBe(
      `${formatEn.format(count)} ${expected}`,
    )
  })

  it("formats fractions with a locale decimal separator", () => {
    expect(pluralize(4.9, formsRu, "ru")).toBe("4,9 серии")
    expect(pluralize(4.9, formsEn, "en")).toBe("4.9 items")
  })

  it("groups thousands by locale", () => {
    expect(pluralize(1000, formsRu, "ru")).toBe("1\u00a0000 серий")
    expect(pluralize(1000, formsEn, "en")).toBe("1,000 items")
  })

  it("falls back to the other form when the category is missing", () => {
    expect(pluralize(5, { other: "серии" }, "ru")).toBe("5 серии")
  })
})
