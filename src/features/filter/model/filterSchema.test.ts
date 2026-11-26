import { describe, expect, it } from "vitest"

import { parseFilter } from "./filterSchema"

describe("parseFilter", () => {
  it("нормализует границы длительности и отбрасывает невалидные значения", () => {
    expect(parseFilter({ durationFrom: "120", durationTo: "90" })).toEqual({
      durationFrom: 90,
      durationTo: 120,
    })
    expect(parseFilter({ durationFrom: "0", durationTo: "1.5" })).toEqual({})
  })

  it("разбирает валидные значения в списки", () => {
    expect(
      parseFilter({
        genre: ["action", "comedy"],
        type: "serial",
        status: "recent",
        age: "pg-13",
        episodes: "short",
        tag: "must-watch",
      }),
    ).toEqual({
      genre: ["action", "comedy"],
      type: ["serial"],
      status: ["recent"],
      age: ["pg-13"],
      episodes: ["short"],
      tag: ["must-watch"],
    })
  })

  it("отбрасывает мусор и пустые строки", () => {
    expect(
      parseFilter({ genre: ["action", "nope"], type: "nope", age: "" }),
    ).toEqual({ genre: ["action"] })
  })

  it("принимает годы только в допустимых границах", () => {
    const now = new Date("2026-06-01")

    expect(parseFilter({ yearFrom: "1959", yearTo: "2027" }, now)).toEqual({
      yearFrom: 1959,
      yearTo: 2027,
    })
    expect(parseFilter({ yearFrom: "1958", yearTo: "2028" }, now)).toEqual({})
    expect(parseFilter({ yearFrom: "2000.5" }, now)).toEqual({})
  })

  it("нормализует диапазоны рейтинга и отзывов независимо", () => {
    expect(
      parseFilter({
        ratingFrom: "8",
        ratingTo: "7.5",
        reviewsFrom: "100",
        reviewsTo: "0",
      }),
    ).toEqual({ ratingFrom: 7.5, ratingTo: 8, reviewsFrom: 0, reviewsTo: 100 })
    expect(
      parseFilter({ ratingFrom: "-1", ratingTo: "11", reviewsFrom: "1.5" }),
    ).toEqual({})
  })

  it("принимает только известные sort и order", () => {
    expect(parseFilter({ sort: "title", order: "asc" })).toEqual({
      sort: "title",
      order: "asc",
    })
    expect(parseFilter({ sort: "nope", order: "0" })).toEqual({})
  })

  it("принимает только известный view", () => {
    expect(parseFilter({ view: "list" })).toEqual({ view: "list" })
    expect(parseFilter({ view: "table" })).toEqual({})
  })

  it("меняет местами yearFrom и yearTo, если они перепутаны", () => {
    expect(parseFilter({ yearFrom: "2020", yearTo: "2010" })).toEqual({
      yearFrom: 2010,
      yearTo: 2020,
    })
  })

  it("обрезает пробелы в search и отбрасывает пустой или длинный запрос", () => {
    expect(parseFilter({ search: "  атака  " })).toEqual({ search: "атака" })
    expect(parseFilter({ search: "   " })).toEqual({})
    expect(parseFilter({ search: "а".repeat(100) })).toEqual({
      search: "а".repeat(100),
    })
    expect(parseFilter({ search: "а".repeat(101) })).toEqual({})
    expect(parseFilter({ search: ["атака", "титан"] })).toEqual({})
  })
})
