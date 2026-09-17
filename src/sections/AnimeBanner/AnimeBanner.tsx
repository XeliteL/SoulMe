import AnimeBannerCard from "@/shared/ui/AnimeBannerCard"
import Slider, { SliderRuntime } from "@/shared/ui/Slider"
import Section from "@/widgets/Section"

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
          <AnimeBannerCard {...animeCard} key={index} />
        ))}
      </Slider>
      <SliderRuntime client:load />
    </Section>
  )
}

export default AnimeBanner
