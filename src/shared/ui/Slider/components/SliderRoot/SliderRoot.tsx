"use client"

import { ReactNode, useState } from "react"
import type { Swiper } from "swiper"

import { SliderContext } from "./SliderContext"

interface SliderRootProps {
  children: ReactNode
}

const SliderRoot = ({ children }: SliderRootProps) => {
  const [swiper, setSwiper] = useState<Swiper | null>(null)

  return <SliderContext value={{ swiper, setSwiper }}>{children}</SliderContext>
}

export default SliderRoot
