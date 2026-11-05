import { useLayoutEffect, useRef } from "react"
import { Swiper } from "swiper"
import { Autoplay, Mousewheel, Scrollbar } from "swiper/modules"
import type { SwiperOptions } from "swiper/types"

import {
  sliderParamsByVariant,
  SliderVariant,
} from "../../../config/sliderParams"
import { useSliderContext } from "../../SliderRoot/SliderContext"

interface UseSwiperOptions {
  variant: SliderVariant
  params?: SwiperOptions
  slidesKey: string
}

const useSwiper = ({ variant, params, slidesKey }: UseSwiperOptions) => {
  const swiperRef = useRef<HTMLDivElement>(null)
  const scrollbarRef = useRef<HTMLDivElement>(null)
  const { swiper, setSwiper } = useSliderContext()
  const paramsKey = JSON.stringify(params ?? {})

  useLayoutEffect(() => {
    const swiperEl = swiperRef.current
    if (!swiperEl) return

    const scrollbarEl = scrollbarRef.current
    const isMotionReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches
    const instance = new Swiper(swiperEl, {
      modules: [Autoplay, Mousewheel, Scrollbar],
      ...sliderParamsByVariant[variant],
      ...(JSON.parse(paramsKey) as SwiperOptions),
      ...(isMotionReduced && { autoplay: false }),
      scrollbar: scrollbarEl
        ? { el: scrollbarEl, dragClass: "slider__scrollbar-drag" }
        : false,
    })
    const pauseAutoplay = () => {
      if (!instance.autoplay.paused) instance.autoplay.pause()
    }
    const resumeAutoplay = () => instance.autoplay.resume()

    swiperEl.addEventListener("focusin", pauseAutoplay)
    swiperEl.addEventListener("focusout", resumeAutoplay)
    setSwiper(instance)

    return () => {
      swiperEl.removeEventListener("focusin", pauseAutoplay)
      swiperEl.removeEventListener("focusout", resumeAutoplay)
      instance.destroy(true, true)
      setSwiper(null)
    }
  }, [variant, paramsKey, setSwiper])

  useLayoutEffect(() => {
    swiper?.update()
  }, [swiper, slidesKey])

  return { swiperRef, scrollbarRef }
}

export default useSwiper
