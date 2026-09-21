import { Children, ReactNode } from "react"
import classNames from "classnames"

import "swiper/css"

import SliderNavigation from "./components/SliderNavigation"
import { SliderVariant } from "./components/SliderRuntime/sliderParams"

import "./Slider.scss"

interface SliderProps {
  children?: ReactNode
  navigationTargetElementId?: string | null
  isBeyondTheViewportOnMobileS?: boolean
  hasScrollbarOnMobile?: boolean
  navigationPosition?: "" | "abs-bottom"
  variant?: SliderVariant
  sliderParams?: object
}

const Slider = ({
  children,
  navigationTargetElementId,
  isBeyondTheViewportOnMobileS = true,
  hasScrollbarOnMobile = true,
  navigationPosition = "",
  variant = "default",
  sliderParams,
}: SliderProps) => {
  const slides = Children.toArray(children)

  return (
    <div
      className={classNames("slider", {
        "slider--beyond-the-viewport-on-mobile-s": isBeyondTheViewportOnMobileS,
      })}
      data-js-slider=""
      data-slider-navigation-target={navigationTargetElementId ?? undefined}
      data-slider-variant={variant}
      data-slider-params={
        sliderParams ? JSON.stringify(sliderParams) : undefined
      }
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

      {!navigationTargetElementId && (
        <SliderNavigation position={navigationPosition} />
      )}

      {hasScrollbarOnMobile && (
        <div className="slider__scrollbar visible-mobile" />
      )}
    </div>
  )
}

export default Slider
