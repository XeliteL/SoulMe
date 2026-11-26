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
  title: "Атака титанов",
  originalTitle: "Shingeki no Kyojin",
  type: "serial",
  status: "released",
  genres: ["action", "comedy"],
  rating: { value: 8, reviewsCount: 100 },
  episodes: 12,
  released: { label: "", dateTime: "2010-04-01" },
  tags: ["must-watch"],
}

const film: Anime = {
  ...base,
  id: "film",
  title: "Твоё имя",
  originalTitle: "Kimi no Na wa.",
  type: "film",
  status: "released",
  ageRating: "r-17",
  genres: ["drama"],
  rating: { value: 7.5, reviewsCount: 50 },
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

  it("фильтрует по длительности с одной или двумя границами", () => {
    expect(ids(applyFilter(items, { durationFrom: 120 }, now))).toEqual([
      "film",
    ])
    expect(ids(applyFilter(items, { durationTo: 119 }, now))).toEqual([])
    expect(
      ids(applyFilter(items, { durationFrom: 120, durationTo: 120 }, now)),
    ).toEqual(["film"])
  })

  it("фильтрует по рейтингу нестрого", () => {
    expect(ids(applyFilter(items, { ratingFrom: 7.5 }, now))).toEqual([
      "serial",
      "film",
    ])
    expect(
      ids(applyFilter(items, { ratingFrom: 7.5, ratingTo: 7.5 }, now)),
    ).toEqual(["film"])
    expect(ids(applyFilter(items, { ratingTo: 0 }, now))).toEqual(["announced"])
  })

  it("фильтрует по количеству отзывов нестрого", () => {
    expect(
      ids(applyFilter(items, { reviewsFrom: 50, reviewsTo: 100 }, now)),
    ).toEqual(["serial", "film"])
    expect(ids(applyFilter(items, { reviewsTo: 0 }, now))).toEqual([
      "announced",
    ])
    expect(
      ids(applyFilter(items, { ratingFrom: 7.5, reviewsTo: 50 }, now)),
    ).toEqual(["film"])
  })

  it("ищет по части названия без учёта регистра", () => {
    expect(ids(applyFilter(items, { search: "АТАКА" }, now))).toEqual([
      "serial",
    ])
  })

  it("ищет по оригинальному названию", () => {
    expect(ids(applyFilter(items, { search: "kimi no" }, now))).toEqual([
      "film",
    ])
  })

  it("не различает ё и е, схлопывает пробелы", () => {
    expect(ids(applyFilter(items, { search: "твое" }, now))).toEqual(["film"])
    expect(ids(applyFilter(items, { search: "атака   титанов" }, now))).toEqual(
      ["serial"],
    )
  })

  it("складывает поиск с остальными условиями", () => {
    expect(
      ids(applyFilter(items, { search: "атака", genre: ["drama"] }, now)),
    ).toEqual([])
  })

  it("ничего не возвращает, если совпадений нет", () => {
    expect(ids(applyFilter(items, { search: "берсерк" }, now))).toEqual([])
  })
})
