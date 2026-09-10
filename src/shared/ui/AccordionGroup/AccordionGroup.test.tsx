import { afterEach, describe, expect, it } from "vitest"

import AccordionGroup from "./AccordionGroup"

import { cleanup, render } from "@testing-library/react"

afterEach(() => {
  cleanup()
})

const makeItems = (count: number) =>
  Array.from({ length: count }, (_, index) => (
    <div key={index}>{`item ${index + 1}`}</div>
  ))

describe("AccordionGroup", () => {
  it("renders one item per child, flat, in a single column by default", () => {
    const { container } = render(
      <AccordionGroup>{makeItems(4)}</AccordionGroup>,
    )

    expect(container.querySelectorAll(".accordion-group__item")).toHaveLength(4)
    expect(container.querySelectorAll(".accordion-group__column")).toHaveLength(
      0,
    )
  })

  it("skips falsy children via Children.toArray", () => {
    const show = false

    const { container } = render(
      <AccordionGroup>
        <div>a</div>
        {show && <div>b</div>}
        {null}
        <div>c</div>
      </AccordionGroup>,
    )

    expect(container.querySelectorAll(".accordion-group__item")).toHaveLength(2)
  })

  it("renders an ordered list with counter styling by default", () => {
    const { container } = render(
      <AccordionGroup>{makeItems(2)}</AccordionGroup>,
    )
    const list = container.querySelector(".accordion-group")

    expect(list?.tagName).toBe("OL")
    expect(list).toHaveClass("accordion-group--has-counter")
  })

  it("renders an unordered list without counter styling when isOrderedList is false", () => {
    const { container } = render(
      <AccordionGroup isOrderedList={false}>{makeItems(2)}</AccordionGroup>,
    )
    const list = container.querySelector(".accordion-group")

    expect(list?.tagName).toBe("UL")
    expect(list).not.toHaveClass("accordion-group--has-counter")
  })

  it("does not add a columns modifier for a single column", () => {
    const { container } = render(
      <AccordionGroup columns={1}>{makeItems(3)}</AccordionGroup>,
    )

    expect(container.querySelector(".accordion-group")?.className).not.toMatch(
      /accordion-group--\d+-columns/,
    )
  })

  describe("columns={2}", () => {
    it("adds the columns modifier and two column wrappers", () => {
      const { container } = render(
        <AccordionGroup columns={2}>{makeItems(6)}</AccordionGroup>,
      )

      expect(container.querySelector(".accordion-group")).toHaveClass(
        "accordion-group--2-columns",
      )
      expect(
        container.querySelectorAll(".accordion-group__column"),
      ).toHaveLength(2)
    })

    it("splits an even count into two equal columns, column-major", () => {
      const { container } = render(
        <AccordionGroup columns={2}>{makeItems(6)}</AccordionGroup>,
      )
      const columns = container.querySelectorAll(".accordion-group__column")

      expect(
        columns[0].querySelectorAll(".accordion-group__item"),
      ).toHaveLength(3)
      expect(
        columns[1].querySelectorAll(".accordion-group__item"),
      ).toHaveLength(3)
      expect(columns[0].textContent).toBe("item 1item 2item 3")
      expect(columns[1].textContent).toBe("item 4item 5item 6")
    })

    it("puts the larger half in the first column for an odd count (ceil)", () => {
      const { container } = render(
        <AccordionGroup columns={2}>{makeItems(5)}</AccordionGroup>,
      )
      const columns = container.querySelectorAll(".accordion-group__column")

      expect(
        columns[0].querySelectorAll(".accordion-group__item"),
      ).toHaveLength(3)
      expect(
        columns[1].querySelectorAll(".accordion-group__item"),
      ).toHaveLength(2)
    })

    it("still renders exactly one item per child", () => {
      const { container } = render(
        <AccordionGroup columns={2}>{makeItems(7)}</AccordionGroup>,
      )

      expect(container.querySelectorAll(".accordion-group__item")).toHaveLength(
        7,
      )
    })
  })
})
