import { describe, expect, it } from "vitest"

import { formatCompactNumberRu } from "./formatCompactNumberRu"

describe("formatCompactNumberRu", () => {
  it.each([
    [0, "0"],
    [900, "900"],
    [999, "999"],
    [1000, "1 тыс."],
    [1500, "1,5 тыс."],
    [12345, "12 тыс."],
    [1000000, "1 млн"],
    [1570000, "1,6 млн"],
  ])("formats %i as '%s'", (value, expected) => {
    expect(formatCompactNumberRu(value)).toBe(expected)
  })
})
