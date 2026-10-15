import { AnimeBannerCard } from "@/entities/anime"
import Section from "@/shared/ui/Section"
import Slider from "@/shared/ui/Slider"

import { animeCards } from "./config/animeCards"

import "./AnimeBanner.scss"

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
        {animeCards.map((animeCard, index) => (
          <AnimeBannerCard
            {...animeCard}
            loading={index === 0 ? "eager" : undefined}
            key={animeCard.id}
          />
        ))}
      </Slider>
    </Section>
  )
}

export default AnimeBanner
