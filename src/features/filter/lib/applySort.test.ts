import { describe, expect, it } from "vitest"

import type { Anime } from "@/entities/anime"

import { applySort } from "./applySort"

const base = {
  kind: "anime",
  originalTitle: "",
  description: "",
  ageRating: "pg-13",
  imgSrc: "",
  views: 0,
} as const

const serial: Anime = {
  ...base,
  genres: [],
  id: "serial",
  title: "Бэта",
  type: "serial",
  status: "released",
  rating: { value: 8, reviewsCount: 0 },
  episodes: 12,
  released: { label: "", dateTime: "2010-04-01" },
}

const film: Anime = {
  ...base,
  genres: [],
  id: "film",
  title: "Вега",
  views: 100,
  type: "film",
  status: "released",
  rating: { value: 7, reviewsCount: 0 },
  duration: 120,
  released: { label: "", dateTime: "2020-01-01" },
}

const announced: Anime = {
  ...base,
  genres: [],
  id: "announced",
  title: "Альфа",
  type: "serial",
  status: "announced",
  rating: { value: 0, reviewsCount: 0 },
}

const items = [announced, film, serial]

const ids = (result: Anime[]) => result.map(({ id }) => id)

describe("applySort", () => {
  it("без sort сортирует по популярности", () => {
    expect(ids(applySort(items, {}))[0]).toBe("film")
  })

  it("без order берёт направление поля по умолчанию", () => {
    expect(ids(applySort(items, { sort: "title" }))).toEqual([
      "announced",
      "serial",
      "film",
    ])
    expect(ids(applySort(items, { sort: "rating" }))).toEqual([
      "serial",
      "film",
      "announced",
    ])
  })

  it("учитывает явный order", () => {
    expect(ids(applySort(items, { sort: "rating", order: "asc" }))).toEqual([
      "film",
      "serial",
      "announced",
    ])
  })

  it("оставляет тайтлы без значения в конце при любом направлении", () => {
    expect(ids(applySort(items, { sort: "released", order: "asc" }))).toEqual([
      "serial",
      "film",
      "announced",
    ])
    expect(ids(applySort(items, { sort: "episodes" }))).toEqual([
      "serial",
      "announced",
      "film",
    ])
  })

  it("не меняет исходный массив", () => {
    applySort(items, { sort: "title" })

    expect(ids(items)).toEqual(["announced", "film", "serial"])
  })
})
