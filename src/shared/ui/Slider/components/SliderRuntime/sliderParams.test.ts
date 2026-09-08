import { describe, expect, it } from "vitest"

import { defaultSliderParams } from "./sliderParams"

const entries = Object.entries(defaultSliderParams.breakpoints) as [
  string,
  { slidesPerView?: number; slidesPerGroup?: number },
][]

describe("defaultSliderParams breakpoints", () => {
  it("defines at least one breakpoint", () => {
    expect(entries.length).toBeGreaterThan(0)
  })

  it.each(entries)(
    "breakpoint %s sets both slidesPerView and slidesPerGroup",
    (_key, params) => {
      expect(typeof params.slidesPerView).toBe("number")
      expect(typeof params.slidesPerGroup).toBe("number")
    },
  )

  it.each(entries)(
    "breakpoint %s advances by 1..slidesPerView slides (no skipped cards)",
    (_key, params) => {
      expect(params.slidesPerGroup).toBeGreaterThanOrEqual(1)
      expect(params.slidesPerGroup as number).toBeLessThanOrEqual(
        params.slidesPerView as number,
      )
    },
  )

  it("orders breakpoints by ascending min-width", () => {
    const widths = entries.map(([key]) => Number(key))

    expect(widths).toEqual([...widths].sort((a, b) => a - b))
  })
})
