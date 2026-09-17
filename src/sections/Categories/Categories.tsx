import CategoryCard from "@/shared/ui/CategoryCard"
import Slider, { SliderNavigation, SliderRuntime } from "@/shared/ui/Slider"
import Section from "@/widgets/Section"

import { categoryItems } from "./config/categoryItems"

const sliderNavigationId = "categories-slider-navigation"

const Categories = () => {
  return (
    <Section
      title="Выбери жанр по настроению"
      id="categories"
      titleId="categories-title"
      description="Ищешь лёгкую комедию, трогательную повседневность или динамичный сёнэн с эпичными сражениями - здесь есть всё"
      actions={<SliderNavigation id={sliderNavigationId} variant="tile" />}
      isActionsHiddenOnMobile
    >
      <Slider
        navigationTargetElementId={sliderNavigationId}
        isBeyondTheViewportOnMobileS
      >
        {categoryItems.map((categoryItem, index) => (
          <CategoryCard {...categoryItem} key={index} />
        ))}
      </Slider>
      <SliderRuntime client:load />
    </Section>
  )
}

export default Categories
