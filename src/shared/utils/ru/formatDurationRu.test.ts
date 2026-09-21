import { describe, expect, it } from "vitest"

import { formatDurationRu } from "./formatDurationRu"

describe("formatDurationRu", () => {
  it.each([
    [0, "0ч 0мин"],
    [5, "0ч 5мин"],
    [59, "0ч 59мин"],
    [60, "1ч 0мин"],
    [125, "2ч 5мин"],
  ])("formats %i minutes as '%s'", (value, expected) => {
    expect(formatDurationRu(value)).toBe(expected)
  })
})
