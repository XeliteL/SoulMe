import { AnimeCard } from "@/entities/anime"
import { CategoryCard } from "@/entities/category"
import Section from "@/shared/ui/Section"
import Slider, { SliderNavigation, SliderRuntime } from "@/shared/ui/Slider"

import { collectionGroups } from "./config/collectionGroups"

import "./Collections.scss"

const Collections = () => {
  return (
    <Section className="collections container" titleId="collections">
      {collectionGroups.map((collectionGroup) => {
        const title = collectionGroup.title
        const collectionItems = collectionGroup.children
        const id = collectionGroup.id

        const titleId = `${title}-title`
        const sliderNavigationId = `${title}-slider-navigation`

        return (
          <Section
            className="collections__section"
            title={title}
            titleId={titleId}
            id={id}
            actions={
              <SliderNavigation id={sliderNavigationId} variant="tile" />
            }
            isActionsHiddenOnMobile
            key={id}
          >
            <Slider
              navigationTargetElementId={sliderNavigationId}
              isBeyondTheViewportOnMobileS
              sliderParams={collectionGroup.sliderParams}
            >
              {collectionItems.map((collectionItem) =>
                collectionItem.kind === "anime" ? (
                  <AnimeCard
                    {...collectionItem}
                    showReleaseDate={collectionGroup.showReleaseDate}
                    showRating={collectionGroup.showRating}
                    key={collectionItem.id}
                  />
                ) : (
                  <CategoryCard
                    {...collectionItem}
                    badge={collectionGroup.badge}
                    key={collectionItem.id}
                  />
                ),
              )}
            </Slider>
          </Section>
        )
      })}
      <SliderRuntime />
    </Section>
  )
}

export default Collections
