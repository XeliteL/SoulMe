import { describe, expect, it } from "vitest"

import { getReleaseYear } from "./getReleaseYear"

describe("getReleaseYear", () => {
  it("берёт год из даты выхода", () => {
    expect(
      getReleaseYear({
        released: { label: "15 июля 2018", dateTime: "2018-07-15" },
      }),
    ).toBe(2018)
  })

  it("возвращает undefined без даты", () => {
    expect(getReleaseYear({ released: undefined })).toBeUndefined()
  })
})
