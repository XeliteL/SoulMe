import { describe, expect, it } from "vitest"

import { ICON_NAMES } from "../config/iconName"
import { buildIconSprite, toSymbol } from "./buildIconSprite"

const SVG = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 1L2 2" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
<path fill-rule="evenodd" d="M3 3" fill="#999"/>
</svg>
`

describe("toSymbol", () => {
  it("wraps the svg content into a symbol with the same viewBox", () => {
    expect(toSymbol("search", SVG)).toMatch(
      /^<symbol id="search" viewBox="0 0 24 24"><path .*<\/symbol>$/s,
    )
  })

  it("strips fill and stroke colors but keeps the other attributes", () => {
    const symbol = toSymbol("search", SVG)

    expect(symbol).not.toMatch(/\s(fill|stroke)="/)
    expect(symbol).toContain('stroke-width="1.5"')
    expect(symbol).toContain('stroke-linecap="round"')
    expect(symbol).toContain('fill-rule="evenodd"')
  })
})

describe("buildIconSprite", () => {
  it("includes a symbol for every icon name", () => {
    const sprite = buildIconSprite()

    for (const name of ICON_NAMES) {
      expect(sprite).toContain(`<symbol id="${name}"`)
    }
  })
})
