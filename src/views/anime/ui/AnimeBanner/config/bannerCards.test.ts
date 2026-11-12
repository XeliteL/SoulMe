import { describe, expect, it } from "vitest"

import { getAnimeById } from "@/entities/anime"

import { bannerCards } from "./bannerCards"

describe("bannerCards", () => {
  it("ссылается только на существующие аниме", () => {
    for (const { animeId } of bannerCards) {
      expect(getAnimeById(animeId), animeId).toBeDefined()
    }
  })
})
