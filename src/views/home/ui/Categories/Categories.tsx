import { CategoryCard, categoryItems } from "@/entities/category"
import Section from "@/shared/ui/Section"
import Slider, { SliderNavigation, SliderRuntime } from "@/shared/ui/Slider"

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
        {categoryItems.map((categoryItem) => (
          <CategoryCard {...categoryItem} key={categoryItem.id} />
        ))}
      </Slider>
      <SliderRuntime />
    </Section>
  )
}

export default Categories
