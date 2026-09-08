import { Children, ReactNode } from "react"
import classNames from "classnames"

import "swiper/css"

import SliderNavigation from "./components/SliderNavigation"

import "./Slider.scss"

interface SliderProps {
  children?: ReactNode
  navigationTargetElementId: string | null
  isBeyondTheViewportOnMobileS?: boolean
  hasScrollbar?: boolean
}

const Slider = ({
  children,
  navigationTargetElementId,
  isBeyondTheViewportOnMobileS = true,
  hasScrollbar = true,
}: SliderProps) => {
  const slides = Children.toArray(children)

  return (
    <div
      className={classNames("slider", {
        "slider--beyond-the-viewport-on-mobile-s": isBeyondTheViewportOnMobileS,
      })}
      data-js-slider=""
      data-slider-navigation-target={navigationTargetElementId ?? undefined}
    >
      <div className="slider__swiper swiper">
        <ul className="slider__list swiper-wrapper">
          {slides.map((slide, index) => (
            <li className="slider__item swiper-slide" key={index}>
              {slide}
            </li>
          ))}
        </ul>
      </div>

      {!navigationTargetElementId && <SliderNavigation />}

      {hasScrollbar && <div className="slider__scrollbar visible-mobile" />}
    </div>
  )
}

export default Slider
