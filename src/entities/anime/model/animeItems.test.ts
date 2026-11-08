import { existsSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, it } from "vitest"

import { animeItems } from "./animeItems"

describe("animeItems", () => {
  it("ссылается только на существующие постеры", () => {
    for (const { imgSrc } of animeItems) {
      expect(existsSync(join(process.cwd(), "public", imgSrc)), imgSrc).toBe(
        true,
      )
    }
  })
})
