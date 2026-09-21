import { afterEach, describe, expect, it } from "vitest"

import Slider from "./Slider"

import { cleanup, render, screen } from "@testing-library/react"

afterEach(() => {
  cleanup()
})

const PREV_BUTTON_NAME = "Предыдущий слайд"

describe("Slider", () => {
  it("renders one swiper-slide per child", () => {
    const { container } = render(
      <Slider navigationTargetElementId={null}>
        <span>a</span>
        <span>b</span>
        <span>c</span>
      </Slider>,
    )

    expect(
      container.querySelectorAll(".slider__item.swiper-slide"),
    ).toHaveLength(3)
  })

  it("skips falsy children via Children.toArray", () => {
    const show = false

    const { container } = render(
      <Slider navigationTargetElementId={null}>
        <span>a</span>
        {show && <span>b</span>}
        {null}
        <span>c</span>
      </Slider>,
    )

    expect(container.querySelectorAll(".swiper-slide")).toHaveLength(2)
  })

  it("keeps the data-js-slider hook and the swiper scaffold", () => {
    const { container } = render(
      <Slider navigationTargetElementId={null}>
        <span>a</span>
      </Slider>,
    )

    const root = container.querySelector(".slider")

    expect(root).toHaveAttribute("data-js-slider")
    expect(root?.querySelector(".slider__swiper.swiper")).toBeInTheDocument()
    expect(
      root?.querySelector(".slider__list.swiper-wrapper"),
    ).toBeInTheDocument()
  })

  describe("navigation placement", () => {
    it("renders its own SliderNavigation when no external target is given", () => {
      const { container } = render(
        <Slider navigationTargetElementId={null}>
          <span>a</span>
        </Slider>,
      )

      expect(
        screen.getByRole("button", { name: PREV_BUTTON_NAME }),
      ).toBeInTheDocument()
      expect(container.querySelector(".slider")).not.toHaveAttribute(
        "data-slider-navigation-target",
      )
    })

    it("omits its own SliderNavigation and exposes the target id for external navigation", () => {
      const { container } = render(
        <Slider navigationTargetElementId="categories-slider-navigation">
          <span>a</span>
        </Slider>,
      )

      expect(
        screen.queryByRole("button", { name: PREV_BUTTON_NAME }),
      ).not.toBeInTheDocument()
      expect(container.querySelector(".slider")).toHaveAttribute(
        "data-slider-navigation-target",
        "categories-slider-navigation",
      )
    })
  })

  describe("scrollbar", () => {
    it("renders the scrollbar track by default", () => {
      const { container } = render(
        <Slider navigationTargetElementId={null}>
          <span>a</span>
        </Slider>,
      )

      expect(container.querySelector(".slider__scrollbar")).toBeInTheDocument()
    })

    it("omits the scrollbar track when hasScrollbar is false", () => {
      const { container } = render(
        <Slider navigationTargetElementId={null} hasScrollbarOnMobile={false}>
          <span>a</span>
        </Slider>,
      )

      expect(
        container.querySelector(".slider__scrollbar"),
      ).not.toBeInTheDocument()
    })
  })

  describe("isBeyondTheViewportOnMobileS", () => {
    it("adds the modifier class by default", () => {
      const { container } = render(
        <Slider navigationTargetElementId={null}>
          <span>a</span>
        </Slider>,
      )

      expect(container.querySelector(".slider")).toHaveClass(
        "slider--beyond-the-viewport-on-mobile-s",
      )
    })

    it("drops the modifier class when set to false", () => {
      const { container } = render(
        <Slider
          navigationTargetElementId={null}
          isBeyondTheViewportOnMobileS={false}
        >
          <span>a</span>
        </Slider>,
      )

      expect(container.querySelector(".slider")).not.toHaveClass(
        "slider--beyond-the-viewport-on-mobile-s",
      )
    })
  })
})
