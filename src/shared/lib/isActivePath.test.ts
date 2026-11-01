import { describe, expect, it } from "vitest"

import { isActivePath } from "./isActivePath"

describe("isActivePath", () => {
  it.each([
    ["/", "/", true],
    ["/anime", "/", false],
    ["/anime", "/anime", true],
    ["/anime/title/k-on", "/anime", true],
    ["/anime-news", "/anime", false],
    ["/news", "/anime", false],
  ])("pathname %s, href %s → %s", (pathname, href, expected) => {
    expect(isActivePath(pathname, href)).toBe(expected)
  })
})
