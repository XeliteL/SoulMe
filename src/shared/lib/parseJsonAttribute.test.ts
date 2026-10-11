import { describe, expect, it } from "vitest"

import parseJsonAttribute from "./parseJsonAttribute"

const ATTRIBUTE = "data-config"

function createElement(value?: string) {
  const element = document.createElement("div")
  if (value !== undefined) element.setAttribute(ATTRIBUTE, value)

  return element
}

describe("parseJsonAttribute", () => {
  it("parses a valid json value", () => {
    const element = createElement('{"slidesPerView":2}')

    expect(parseJsonAttribute(element, ATTRIBUTE, {})).toEqual({
      slidesPerView: 2,
    })
  })

  it.each([
    ["is missing", undefined],
    ["is empty", ""],
    ["contains invalid json", "{slidesPerView:"],
  ])("returns the fallback when the attribute %s", (_, value) => {
    const fallback = { slidesPerView: 1 }

    expect(parseJsonAttribute(createElement(value), ATTRIBUTE, fallback)).toBe(
      fallback,
    )
  })
})
