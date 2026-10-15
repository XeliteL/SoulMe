import { CategoryCard, categoryItems } from "@/entities/category"
import Section from "@/shared/ui/Section"
import { SliderNavigation, SliderRoot, SliderTrack } from "@/shared/ui/Slider"

const Categories = () => {
  return (
    <SliderRoot>
      <Section
        title="Выбери жанр по настроению"
        id="categories"
        description="Ищешь лёгкую комедию, трогательную повседневность или динамичный сёнэн с эпичными сражениями - здесь есть всё"
        actions={<SliderNavigation variant="tile" />}
        isActionsHiddenOnMobile
      >
        <SliderTrack>
          {categoryItems.map((categoryItem) => (
            <CategoryCard {...categoryItem} key={categoryItem.id} />
          ))}
        </SliderTrack>
      </Section>
    </SliderRoot>
  )
}

export default Categories
