import { AnimeBannerCard, getAnimeById } from "@/entities/anime"
import { ListToggle } from "@/features/lists"
import Section from "@/shared/ui/Section"
import Slider from "@/shared/ui/Slider"

import { bannerCards } from "./config/bannerCards"

import "./AnimeBanner.scss"

const slides = bannerCards.flatMap(({ animeId, ...card }) => {
  const anime = getAnimeById(animeId)

  return anime ? [{ ...card, anime }] : []
})

const AnimeBanner = () => {
  const titleId = "anime-banner-title"

  return (
    <Section className="anime-banner" ariaLabelledby={titleId}>
      <h1 className="visually-hidden" id={titleId}>
        Аниме
      </h1>
      <Slider
        variant="banner"
        navigationPosition="abs-bottom"
        hasScrollbarOnMobile={false}
        isBeyondTheViewportOnMobileS={false}
      >
        {slides.map(({ anime, description, imgSrc }, index) => (
          <AnimeBannerCard
            anime={anime}
            description={description}
            imgSrc={imgSrc}
            actions={
              <>
                <ListToggle animeId={anime.id} list="bookmarks" />
                <ListToggle animeId={anime.id} list="favorites" />
              </>
            }
            loading={index === 0 ? "eager" : undefined}
            key={anime.id}
          />
        ))}
      </Slider>
    </Section>
  )
}

export default AnimeBanner
