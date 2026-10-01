import type { Swiper } from "swiper"
import { afterEach, describe, expect, it } from "vitest"

import Slider from "../../Slider"
import SliderRuntime from "./SliderRuntime"

import { cleanup, render } from "@testing-library/react"

afterEach(() => {
  cleanup()
})

type SwiperHost = HTMLElement & { swiper?: Swiper | null }

function getSwiperEls(container: HTMLElement) {
  return Array.from(container.querySelectorAll<SwiperHost>(".swiper"))
}

function sliders(runtimesCount: number) {
  return (
    <>
      <Slider navigationTargetElementId={null}>
        <span>a</span>
        <span>b</span>
      </Slider>
      <Slider navigationTargetElementId={null}>
        <span>c</span>
        <span>d</span>
      </Slider>
      {Array.from({ length: runtimesCount }, (_, index) => (
        <SliderRuntime key={index} />
      ))}
    </>
  )
}

function renderSliders(runtimesCount: number) {
  return render(sliders(runtimesCount))
}

describe("SliderRuntime", () => {
  it("initializes swiper on every slider", () => {
    const { container } = renderSliders(1)

    getSwiperEls(container).forEach((swiperEl) => {
      expect(swiperEl.swiper).toBeTruthy()
      expect(swiperEl.swiper?.destroyed).toBeFalsy()
    })
  })

  it("does not reinitialize sliders when several runtimes are mounted", () => {
    const { container, rerender } = renderSliders(1)
    const initialInstances = getSwiperEls(container).map((el) => el.swiper)

    rerender(sliders(2))

    getSwiperEls(container).forEach((swiperEl, index) => {
      expect(swiperEl.swiper).toBe(initialInstances[index])
      expect(swiperEl.swiper?.destroyed).toBeFalsy()
    })
  })

  it("keeps sliders alive when a runtime that skipped them unmounts", () => {
    const { container, rerender } = renderSliders(2)
    const initialInstances = getSwiperEls(container).map((el) => el.swiper)

    rerender(sliders(1))

    getSwiperEls(container).forEach((swiperEl, index) => {
      expect(swiperEl.swiper).toBe(initialInstances[index])
      expect(swiperEl.swiper?.destroyed).toBeFalsy()
    })
  })

  it("destroys its instances on unmount so sliders can be reinitialized", () => {
    const { container, unmount } = renderSliders(1)
    const swiperEls = getSwiperEls(container)
    const instances = swiperEls.map((el) => el.swiper)

    unmount()

    instances.forEach((instance) => expect(instance?.destroyed).toBe(true))
    swiperEls.forEach((swiperEl) => expect(swiperEl.swiper).toBeNull())
  })
})
