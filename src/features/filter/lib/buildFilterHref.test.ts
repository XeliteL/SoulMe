import { describe, expect, it } from "vitest"

import { type Filter, parseFilter } from "../model/filterSchema"
import { buildFilterHref } from "./buildFilterHref"

const parseHref = (href: string) => {
  const params = new URL(href, "http://localhost").searchParams

  return parseFilter(
    Object.fromEntries(
      [...new Set(params.keys())].map((key) => {
        const values = params.getAll(key)

        return [key, values.length > 1 ? values : values[0]]
      }),
    ),
  )
}

describe("buildFilterHref", () => {
  it("без фильтра ведёт на голый путь", () => {
    expect(buildFilterHref({})).toBe("/anime/filter")
  })

  it("собирает ссылку, которую parseFilter разбирает обратно", () => {
    const filter: Filter = {
      collection: "comedy",
      genre: ["action", "comedy"],
      yearFrom: 2010,
      type: ["serial"],
      rating: "8",
      sort: "rating",
      order: "asc",
    }

    expect(parseHref(buildFilterHref(filter))).toEqual(filter)
  })

  it("пишет order только если он отличается от направления поля", () => {
    expect(buildFilterHref({ sort: "title", order: "asc" })).toBe(
      "/anime/filter?sort=title",
    )
    expect(buildFilterHref({ sort: "title", order: "desc" })).toBe(
      "/anime/filter?sort=title&order=desc",
    )
    expect(buildFilterHref({ order: "asc" })).toBe("/anime/filter")
  })
})
