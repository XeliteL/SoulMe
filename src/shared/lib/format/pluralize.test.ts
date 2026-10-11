import { describe, expect, it } from "vitest"

import { pluralize } from "./pluralize"

const formsRu = { one: "серия", few: "серии", many: "серий", other: "серии" }

const formsEn = { one: "item", other: "items" }

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
    expect(pluralize(count, formsRu, "ru")).toBe(`${count} ${expected}`)
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
    expect(pluralize(count, formsEn, "en")).toBe(`${count} ${expected}`)
  })

  it("falls back to the other form when the category is missing", () => {
    expect(pluralize(5, { other: "серии" }, "ru")).toBe("5 серии")
  })
})
