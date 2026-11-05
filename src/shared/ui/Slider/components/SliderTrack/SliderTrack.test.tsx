import { useEffect } from "react"
import { Swiper } from "swiper"
import type { SwiperOptions } from "swiper/types"
import { afterEach, describe, expect, it, vi } from "vitest"

import { sliderParamsByVariant } from "../../config/sliderParams"
import SliderRoot from "../SliderRoot"
import { useSliderContext } from "../SliderRoot/SliderContext"
import SliderTrack from "./SliderTrack"

import { cleanup, render } from "@testing-library/react"

const onContextSwiper = vi.fn<(swiper: Swiper | null) => void>()

afterEach(() => {
  cleanup()
  onContextSwiper.mockClear()
})

type SwiperHost = HTMLElement & { swiper?: Swiper | null }

const ContextProbe = () => {
  const { swiper } = useSliderContext()

  useEffect(() => {
    onContextSwiper(swiper)
  }, [swiper])

  return null
}

const getContextSwiper = () => onContextSwiper.mock.lastCall?.[0]

const getSwiperEl = (container: HTMLElement) =>
  container.querySelector<SwiperHost>(".swiper") as SwiperHost

const renderSlides = (count: number) =>
  Array.from({ length: count }, (_, index) => (
    <span key={`slide-${index}`}>{index}</span>
  ))

interface TrackProps {
  slidesCount?: number
  params?: SwiperOptions
  variant?: "default" | "banner"
  isTrackShown?: boolean
}

const track = ({
  slidesCount = 2,
  isTrackShown = true,
  ...props
}: TrackProps = {}) => (
  <SliderRoot>
    {isTrackShown && (
      <SliderTrack {...props}>{renderSlides(slidesCount)}</SliderTrack>
    )}
    <ContextProbe />
  </SliderRoot>
)

describe("SliderTrack", () => {
  it("creates a swiper from the variant and custom params and shares it through the context", () => {
    const { container } = render(
      track({ variant: "banner", params: { spaceBetween: 99 } }),
    )
    const swiper = getSwiperEl(container).swiper

    expect(swiper).toBeInstanceOf(Swiper)
    expect(swiper?.params.breakpoints).toEqual(
      sliderParamsByVariant.banner.breakpoints,
    )
    expect(swiper?.params.spaceBetween).toBe(99)
    expect(getContextSwiper()).toBe(swiper)
  })

  it("picks up added and removed slides without recreating the swiper", () => {
    const { container, rerender } = render(track({ slidesCount: 2 }))
    const swiper = getSwiperEl(container).swiper

    rerender(track({ slidesCount: 4 }))

    expect(getSwiperEl(container).swiper).toBe(swiper)
    expect(container.querySelectorAll(".slider__item")).toHaveLength(4)
    expect(swiper?.slides).toHaveLength(4)

    rerender(track({ slidesCount: 1 }))

    expect(swiper?.slides).toHaveLength(1)
  })

  it("recreates the swiper only when params change", () => {
    const { container, rerender } = render(track({ params: { speed: 500 } }))
    const swiper = getSwiperEl(container).swiper

    rerender(track({ params: { speed: 500 } }))

    expect(getSwiperEl(container).swiper).toBe(swiper)

    rerender(track({ params: { speed: 800 } }))

    const nextSwiper = getSwiperEl(container).swiper

    expect(swiper?.destroyed).toBe(true)
    expect(nextSwiper?.params.speed).toBe(800)
    expect(getContextSwiper()).toBe(nextSwiper)
  })

  it("destroys the swiper and clears the context when the track unmounts", () => {
    const { container, rerender } = render(track())
    const swiperEl = getSwiperEl(container)
    const swiper = swiperEl.swiper

    rerender(track({ isTrackShown: false }))

    expect(swiper?.destroyed).toBe(true)
    expect(swiperEl.swiper).toBeNull()
    expect(getContextSwiper()).toBeNull()
  })

  it("attaches the scrollbar", () => {
    const { container } = render(track())

    expect(
      container.querySelector(".slider__scrollbar .slider__scrollbar-drag"),
    ).toBeInTheDocument()
  })
})
