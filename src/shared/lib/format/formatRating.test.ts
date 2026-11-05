import { describe, expect, it } from "vitest"

import { formatRating } from "./formatRating"

describe("formatRating", () => {
  it.each([
    [0, "0.0"],
    [9, "9.0"],
    [8.3, "8.3"],
    [8.25, "8.3"],
    [10, "10.0"],
  ])("formats %d as '%s' in en", (value, expected) => {
    expect(formatRating(value, "en")).toBe(expected)
  })

  it.each([
    [0, "0,0"],
    [9, "9,0"],
    [8.3, "8,3"],
    [10, "10,0"],
  ])("formats %d as '%s' in ru", (value, expected) => {
    expect(formatRating(value, "ru")).toBe(expected)
  })
})
