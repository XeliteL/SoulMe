import { AnimeCard } from "@/entities/anime"
import { CategoryCard } from "@/entities/category"
import { getCategoryHref } from "@/features/filter"
import Button from "@/shared/ui/Button"
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
          categoryFilter,
          more,
        } = collectionGroup

        return (
          <SliderRoot key={id}>
            <Section
              className="collections__section"
              title={title}
              id={id}
              actions={
                <>
                  {more && (
                    <Button
                      className="collections__all-button"
                      iconName={more.iconName}
                      variant="black-06"
                      label={more.label}
                      href={more.href}
                      isLabelHidden
                      hasFillIcon
                    />
                  )}
                  <SliderNavigation className="hidden-mobile" variant="tile" />
                </>
              }
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
                    <CategoryCard
                      {...item}
                      href={getCategoryHref(item, categoryFilter)}
                      badge={badge}
                      key={item.id}
                    />
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
