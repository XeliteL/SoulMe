import { describe, expect, it } from "vitest"

import { formatCompactNumberEn } from "./formatCompactNumberEn"

describe("formatCompactNumberEn", () => {
  it.each([
    [0, "0"],
    [900, "900"],
    [999, "999"],
    [1000, "1K"],
    [1500, "1.5K"],
    [12345, "12K"],
    [1000000, "1M"],
    [1570000, "1.6M"],
  ])("formats %i as '%s'", (value, expected) => {
    expect(formatCompactNumberEn(value)).toBe(expected)
  })
})
