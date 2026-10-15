"use client"

import { createContext, useContext } from "react"
import type { Swiper } from "swiper"

interface SliderContextValue {
  swiper: Swiper | null
  setSwiper: (swiper: Swiper | null) => void
}

export const SliderContext = createContext<SliderContextValue | null>(null)

export const useSliderContext = () => {
  const context = useContext(SliderContext)
  if (!context)
    throw new Error("Slider part must be rendered inside SliderRoot")
  return context
}
