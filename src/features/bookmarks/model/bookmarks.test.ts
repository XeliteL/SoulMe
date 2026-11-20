import { describe, expect, it } from "vitest"

import { bookmarkViewKeys, getBookmarkView, toBookmark } from "./bookmarks"

describe("bookmarks", () => {
  it("закладка без маркера — вид bookmarks", () => {
    expect(toBookmark("bookmarks")).toEqual({})
    expect(getBookmarkView({})).toBe("bookmarks")
  })

  it("маркер становится закладкой с этим маркером", () => {
    expect(toBookmark("favorite")).toEqual({ marker: "favorite" })
  })

  it.each(bookmarkViewKeys)(
    "вид %s переживает перевод туда и обратно",
    (view) => {
      expect(getBookmarkView(toBookmark(view))).toBe(view)
    },
  )
})
