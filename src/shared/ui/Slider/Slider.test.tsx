import type { Swiper } from "swiper"
import { afterEach, describe, expect, it } from "vitest"

import { sliderParamsByVariant } from "./config/sliderParams"
import Slider from "./Slider"

import { cleanup, render, within } from "@testing-library/react"

afterEach(() => {
  cleanup()
})

type SwiperHost = HTMLElement & { swiper?: Swiper | null }

describe("Slider", () => {
  it("renders the slides with its own navigation inside the slider", () => {
    const { container } = render(
      <Slider>
        <span>a</span>
        <span>b</span>
        <span>c</span>
      </Slider>,
    )
    const slider = container.querySelector(".slider") as HTMLElement

    expect(slider.querySelectorAll(".slider__item")).toHaveLength(3)
    expect(
      within(slider).getByRole("button", { name: "Следующий слайд" }),
    ).toBeInTheDocument()
  })

  it("passes the track props through", () => {
    const { container } = render(
      <Slider
        variant="banner"
        navigationPosition="abs-bottom"
        isBeyondTheViewportOnMobileS={false}
        hasScrollbarOnMobile={false}
      >
        <span>a</span>
      </Slider>,
    )
    const swiperEl = container.querySelector<SwiperHost>(".swiper")

    expect(container.querySelector(".slider")).not.toHaveClass(
      "slider--beyond-the-viewport-on-mobile-s",
    )
    expect(
      container.querySelector(".slider__scrollbar"),
    ).not.toBeInTheDocument()
    expect(container.querySelector(".slider-navigation")).toHaveClass(
      "slider-navigation--abs-bottom",
    )
    expect(swiperEl?.swiper?.params.breakpoints).toEqual(
      sliderParamsByVariant.banner.breakpoints,
    )
  })
})
