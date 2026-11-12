import { describe, expect, it } from "vitest"

import { collectionPresets } from "../config/collectionPresets"
import { getCollectionTitle } from "./getCollectionTitle"

describe("getCollectionTitle", () => {
  it("берёт заголовок пресета", () => {
    expect(getCollectionTitle("trends")).toBe(collectionPresets.trends.title)
  })

  it("берёт название категории", () => {
    expect(getCollectionTitle("comedy")).toBe("Комедия")
  })

  it.each([undefined, "", "unknown", "toString", "__proto__"])(
    "возвращает undefined для %j",
    (collection) => {
      expect(getCollectionTitle(collection)).toBeUndefined()
    },
  )
})
