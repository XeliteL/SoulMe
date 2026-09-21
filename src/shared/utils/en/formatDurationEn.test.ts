import { describe, expect, it } from "vitest"

import { formatDurationEn } from "./formatDurationEn"

describe("formatDurationEn", () => {
  it.each([
    [0, "0h 0min"],
    [5, "0h 5min"],
    [59, "0h 59min"],
    [60, "1h 0min"],
    [125, "2h 5min"],
  ])("formats %i minutes as '%s'", (value, expected) => {
    expect(formatDurationEn(value)).toBe(expected)
  })
})
