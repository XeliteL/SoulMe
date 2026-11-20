import { AnimeBannerCard, getAnimeById } from "@/entities/anime"
import { BookmarkToggle } from "@/features/bookmarks"
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
            actions={<BookmarkToggle animeId={anime.id} view="bookmarks" />}
            loading={index === 0 ? "eager" : undefined}
            key={anime.id}
          />
        ))}
      </Slider>
    </Section>
  )
}

export default AnimeBanner
