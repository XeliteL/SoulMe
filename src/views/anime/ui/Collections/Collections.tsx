import { AnimeCard } from "@/entities/anime"
import { CategoryCard } from "@/entities/category"
import Section from "@/shared/ui/Section"
import { SliderNavigation, SliderRoot, SliderTrack } from "@/shared/ui/Slider"

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

        return (
          <SliderRoot key={id}>
            <Section
              className="collections__section"
              title={title}
              id={id}
              actions={<SliderNavigation variant="tile" />}
              isActionsHiddenOnMobile
            >
              <SliderTrack params={sliderParams}>
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
              </SliderTrack>
            </Section>
          </SliderRoot>
        )
      })}
    </div>
  )
}

export default Collections
