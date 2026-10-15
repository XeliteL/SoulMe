"use client"

import { Children, isValidElement, ReactNode } from "react"
import classNames from "classnames"
import type { SwiperOptions } from "swiper/types"

import "swiper/swiper.css"

import { SliderVariant } from "../../config/sliderParams"
import useSwiper from "./useSwiper"

import "./SliderTrack.scss"

interface SliderTrackProps {
  children?: ReactNode
  navigation?: ReactNode
  variant?: SliderVariant
  params?: SwiperOptions
  isBeyondTheViewportOnMobileS?: boolean
  hasScrollbarOnMobile?: boolean
}

const SliderTrack = ({
  children,
  navigation,
  variant = "default",
  params,
  isBeyondTheViewportOnMobileS = true,
  hasScrollbarOnMobile = true,
}: SliderTrackProps) => {
  const slides = Children.toArray(children)
  const slidesKey = slides
    .map((slide, index) => (isValidElement(slide) ? slide.key : index))
    .join("|")
  const { swiperRef, scrollbarRef } = useSwiper({ variant, params, slidesKey })

  return (
    <div
      className={classNames("slider", {
        "slider--beyond-the-viewport-on-mobile-s": isBeyondTheViewportOnMobileS,
      })}
    >
      <div className="slider__swiper swiper" ref={swiperRef}>
        <ul className="slider__list swiper-wrapper">
          {slides.map((slide, index) => (
            <li
              className="slider__item swiper-slide"
              key={isValidElement(slide) ? slide.key : index}
            >
              {slide}
            </li>
          ))}
        </ul>
      </div>

      {navigation}

      {hasScrollbarOnMobile && (
        <div className="slider__scrollbar visible-mobile" ref={scrollbarRef} />
      )}
    </div>
  )
}

export default SliderTrack
