import { describe, expect, it } from "vitest"

import type { Anime } from "@/entities/anime"

import { applyFilter } from "./applyFilter"

const base = {
  kind: "anime",
  title: "",
  originalTitle: "",
  description: "",
  ageRating: "pg-13",
  imgSrc: "",
  views: 0,
  rating: { value: 0, reviewsCount: 0 },
} as const

const serial: Anime = {
  ...base,
  id: "serial",
  type: "serial",
  status: "released",
  genres: ["action", "comedy"],
  rating: { value: 8, reviewsCount: 0 },
  episodes: 12,
  released: { label: "", dateTime: "2010-04-01" },
  tags: ["must-watch"],
}

const film: Anime = {
  ...base,
  id: "film",
  type: "film",
  status: "released",
  ageRating: "r-17",
  genres: ["drama"],
  rating: { value: 7.5, reviewsCount: 0 },
  duration: 120,
  released: { label: "", dateTime: "2026-09-01" },
}

const announced: Anime = {
  ...base,
  id: "announced",
  type: "serial",
  status: "announced",
  genres: ["comedy"],
}

const items = [serial, film, announced]
const now = new Date("2026-11-11")

const ids = (result: Anime[]) => result.map(({ id }) => id)

describe("applyFilter", () => {
  it("без фильтра возвращает всё", () => {
    expect(applyFilter(items, {}, now)).toEqual(items)
  })

  it("фильтрует по жанрам, типу, возрасту и тегу", () => {
    expect(
      ids(applyFilter(items, { genre: ["comedy", "drama"] }, now)),
    ).toEqual(["serial", "film", "announced"])
    expect(ids(applyFilter(items, { type: ["film"] }, now))).toEqual(["film"])
    expect(ids(applyFilter(items, { age: ["r-17"] }, now))).toEqual(["film"])
    expect(ids(applyFilter(items, { tag: ["must-watch"] }, now))).toEqual([
      "serial",
    ])
  })

  it("фильтрует по годам и статусу recent", () => {
    expect(ids(applyFilter(items, { yearFrom: 2020 }, now))).toEqual(["film"])
    expect(ids(applyFilter(items, { status: ["recent"] }, now))).toEqual([
      "film",
    ])
  })

  it("по сериям пропускает тайтлы без episodes", () => {
    expect(ids(applyFilter(items, { episodes: ["short"] }, now))).toEqual([
      "serial",
    ])
  })

  it("фильтрует по рейтингу нестрого", () => {
    expect(ids(applyFilter(items, { rating: "7" }, now))).toEqual([
      "serial",
      "film",
    ])
    expect(ids(applyFilter(items, { rating: "8" }, now))).toEqual(["serial"])
    expect(ids(applyFilter(items, { rating: "9" }, now))).toEqual([])
  })
})
