import { describe, expect, it } from "vitest"

import { formatCompactNumber } from "./formatCompactNumber"

describe("formatCompactNumber", () => {
  it.each([
    [0, "0"],
    [900, "900"],
    [999, "999"],
    [1000, "1K"],
    [1500, "1.5K"],
    [12345, "12K"],
    [1000000, "1M"],
    [1570000, "1.6M"],
  ])("formats %i as '%s' in en", (value, expected) => {
    expect(formatCompactNumber(value, "en")).toBe(expected)
  })

  it.each([
    [0, "0"],
    [900, "900"],
    [999, "999"],
    [1000, "1\u00a0тыс."],
    [1500, "1,5\u00a0тыс."],
    [12345, "12\u00a0тыс."],
    [1000000, "1\u00a0млн"],
    [1570000, "1,6\u00a0млн"],
  ])("formats %i as '%s' in ru", (value, expected) => {
    expect(formatCompactNumber(value, "ru")).toBe(expected)
  })
})
