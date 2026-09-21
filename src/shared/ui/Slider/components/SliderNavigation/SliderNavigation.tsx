import classNames from "classnames"

import Button from "@/shared/ui/Button"

import "./SliderNavigation.scss"

interface SliderNavigationProps {
  id?: string
  variant?: "" | "tile"
  hasPagination?: boolean
  position?: "" | "abs-bottom"
}

const SliderNavigation = ({
  id,
  variant = "",
  hasPagination = true,
  position = "",
}: SliderNavigationProps) => {
  return (
    <div
      className={classNames("slider-navigation", {
        [`slider-navigation--${variant}`]: variant,
        [`slider-navigation--${position}`]: position,
      })}
      id={id}
    >
      <Button
        className="slider-navigation__arrow-button slider-navigation__arrow-button--previous"
        variant="black-10"
        iconName="arrow-left"
        label="Предыдущий слайд"
        isLabelHidden
      />
      {hasPagination && <div className="slider-navigation__pagination" />}
      <Button
        className="slider-navigation__arrow-button slider-navigation__arrow-button--next"
        variant="black-10"
        iconName="arrow-right"
        label="Следующий слайд"
        isLabelHidden
      />
    </div>
  )
}

export default SliderNavigation
