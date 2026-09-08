import classNames from "classnames"

import Button from "@/shared/ui/Button"

import "./SliderNavigation.scss"

interface SliderNavigationProps {
  className?: string
  id?: string
  variant?: "" | "tile"
  hasPagination?: boolean
}

const SliderNavigation = ({
  className,
  id,
  variant = "",
  hasPagination = true,
}: SliderNavigationProps) => {
  return (
    <div
      className={classNames(className, "slider-navigation", {
        [`slider-navigation--${variant}`]: variant,
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
