import { describe, expect, it } from "vitest"

import { formatDuration } from "./formatDuration"

describe("formatDuration", () => {
  it.each([
    [0, "0ч 0мин"],
    [5, "0ч 5мин"],
    [59, "0ч 59мин"],
    [60, "1ч 0мин"],
    [125, "2ч 5мин"],
  ])("formats %i minutes as '%s' in ru", (value, expected) => {
    expect(formatDuration(value, "ru")).toBe(expected)
  })

  it.each([
    [0, "0h 0min"],
    [5, "0h 5min"],
    [59, "0h 59min"],
    [60, "1h 0min"],
    [125, "2h 5min"],
  ])("formats %i minutes as '%s' шin en", (value, expected) => {
    expect(formatDuration(value, "en")).toBe(expected)
  })
})
