import { ReactNode } from "react"
import type { SwiperOptions } from "swiper/types"

import SliderNavigation from "./components/SliderNavigation"
import SliderRoot from "./components/SliderRoot"
import SliderTrack from "./components/SliderTrack"
import { SliderVariant } from "./config/sliderParams"

interface SliderProps {
  children?: ReactNode
  navigationPosition?: "" | "abs-bottom"
  variant?: SliderVariant
  params?: SwiperOptions
  isBeyondTheViewportOnMobileS?: boolean
  hasScrollbarOnMobile?: boolean
}

const Slider = ({
  children,
  navigationPosition = "",
  variant,
  params,
  isBeyondTheViewportOnMobileS,
  hasScrollbarOnMobile,
}: SliderProps) => {
  return (
    <SliderRoot>
      <SliderTrack
        navigation={<SliderNavigation position={navigationPosition} />}
        variant={variant}
        params={params}
        isBeyondTheViewportOnMobileS={isBeyondTheViewportOnMobileS}
        hasScrollbarOnMobile={hasScrollbarOnMobile}
      >
        {children}
      </SliderTrack>
    </SliderRoot>
  )
}

export default Slider
