import { AnimeBannerCard } from "@/entities/anime"
import Section from "@/shared/ui/Section"
import Slider, { SliderRuntime } from "@/shared/ui/Slider"

import { animeCards } from "./config/animeCards"

import "./AnimeBanner.scss"

const AnimeBanner = () => {
  const titleId = "anime-banner-title"

  return (
    <Section className="anime-banner">
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
      <SliderRuntime />
    </Section>
  )
}

export default AnimeBanner
