import { AnimeCard } from "@/entities/anime"
import { CategoryCard } from "@/entities/category"
import Section from "@/shared/ui/Section"
import Slider, { SliderNavigation, SliderRuntime } from "@/shared/ui/Slider"

import { collectionGroups } from "./config/collectionGroups"

import "./Collections.scss"

const Collections = () => {
  return (
    <div className="collections">
      {collectionGroups.map((collectionGroup) => {
        const {
          title,
          items,
          id,
          sliderParams,
          showReleaseDate,
          showRating,
          badge,
        } = collectionGroup
        const sliderNavigationId = `${id}-slider-navigation`

        return (
          <Section
            className="collections__section"
            title={title}
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
              sliderParams={sliderParams}
            >
              {items.map((item) =>
                item.kind === "anime" ? (
                  <AnimeCard
                    {...item}
                    showReleaseDate={showReleaseDate}
                    showRating={showRating}
                    key={item.id}
                  />
                ) : (
                  <CategoryCard {...item} badge={badge} key={item.id} />
                ),
              )}
            </Slider>
          </Section>
        )
      })}
      <SliderRuntime />
    </div>
  )
}

export default Collections
