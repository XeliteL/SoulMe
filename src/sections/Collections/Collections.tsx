import AnimeCard from "@/shared/ui/AnimeCard"
import CategoryCard from "@/shared/ui/CategoryCard"
import Slider, { SliderNavigation, SliderRuntime } from "@/shared/ui/Slider"
import Section from "@/widgets/Section"

import { collectionGroups } from "./config/collectionGroups"

import "./Collections.scss"

const Collections = () => {
  return (
    <Section className="collections container" titleId="collections">
      {collectionGroups.map((collectionGroup, index) => {
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
            key={index}
          >
            <Slider
              navigationTargetElementId={sliderNavigationId}
              isBeyondTheViewportOnMobileS
              sliderParams={collectionGroup.sliderParams}
            >
              {collectionItems.map((collectionItem, index) =>
                collectionItem.kind === "anime" ? (
                  <AnimeCard
                    {...collectionItem}
                    showReleaseDate={collectionGroup.showReleaseDate}
                    showRating={collectionGroup.showRating}
                    key={index}
                  />
                ) : (
                  <CategoryCard
                    {...collectionItem}
                    badge={collectionGroup.badge}
                    key={index}
                  />
                ),
              )}
            </Slider>
            <SliderRuntime client:load />
          </Section>
        )
      })}
    </Section>
  )
}

export default Collections
