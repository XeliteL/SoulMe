"use client"

import classNames from "classnames"

import Button from "@/shared/ui/Button"

import { useSliderContext } from "../SliderRoot/SliderContext"
import useSliderState from "./useSliderState"

import "./SliderNavigation.scss"

interface SliderNavigationLabels {
  previous: string
  next: string
  slide: string
}

const defaultLabels: SliderNavigationLabels = {
  previous: "Предыдущий слайд",
  next: "Следующий слайд",
  slide: "Слайд",
}

interface SliderNavigationProps {
  variant?: "" | "tile"
  hasPagination?: boolean
  position?: "" | "abs-bottom"
  labels?: SliderNavigationLabels
}

const SliderNavigation = ({
  variant = "",
  hasPagination = true,
  position = "",
  labels = defaultLabels,
}: SliderNavigationProps) => {
  const { swiper } = useSliderContext()
  const { isBeginning, isEnd, snapIndex, snapCount } = useSliderState(swiper)

  return (
    <div
      className={classNames("slider-navigation", {
        [`slider-navigation--${variant}`]: variant,
        [`slider-navigation--${position}`]: position,
      })}
    >
      <Button
        className="slider-navigation__arrow-button"
        variant="black-10"
        iconName="arrow-left"
        label={labels.previous}
        isLabelHidden
        disabled={!swiper || isBeginning}
        onClick={() => swiper?.slidePrev()}
      />
      {hasPagination && (
        <div className="slider-navigation__pagination">
          {Array.from({ length: snapCount }, (_, index) => (
            <button
              className={classNames("slider-navigation__pagination-bullet", {
                "is-active": index === snapIndex,
              })}
              type="button"
              aria-label={`${labels.slide} ${index + 1}`}
              aria-current={index === snapIndex ? "true" : undefined}
              onClick={() =>
                swiper?.slideTo(index * (swiper.params.slidesPerGroup ?? 1))
              }
              key={index}
            />
          ))}
        </div>
      )}
      <Button
        className="slider-navigation__arrow-button"
        variant="black-10"
        iconName="arrow-right"
        label={labels.next}
        isLabelHidden
        disabled={!swiper || isEnd}
        onClick={() => swiper?.slideNext()}
      />
    </div>
  )
}

export default SliderNavigation
