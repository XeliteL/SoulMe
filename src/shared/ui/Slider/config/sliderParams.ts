import type { SwiperOptions } from "swiper/types"

export type SliderVariant = "default" | "banner"

const shared = {
  mousewheel: { forceToAxis: true },
}

export const sliderParamsByVariant = {
  default: {
    ...shared,
    breakpoints: {
      0: {
        slidesPerView: 2,
        slidesPerGroup: 1,
        spaceBetween: 10,
      },
      650: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 10,
      },
      900: {
        slidesPerView: 4,
        slidesPerGroup: 4,
        spaceBetween: 15,
      },
      1025: {
        slidesPerView: 4,
        slidesPerGroup: 4,
        spaceBetween: 20,
      },
      1200: {
        slidesPerView: 5,
        slidesPerGroup: 5,
        spaceBetween: 20,
      },
      1441: {
        slidesPerView: 5,
        slidesPerGroup: 5,
        spaceBetween: 30,
      },
      2000: {
        slidesPerView: 6,
        slidesPerGroup: 6,
        spaceBetween: 30,
      },
    },
  },
  banner: {
    ...shared,
    breakpoints: {
      0: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 20,
      },
      481: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 20,
      },
      1025: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 20,
      },
      1200: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 20,
      },
      1441: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 30,
      },
    },
    autoplay: {
      delay: 15000,
      disableOnInteraction: true,
      pauseOnMouseEnter: true,
    },
  },
} satisfies Record<SliderVariant, SwiperOptions>

export const defaultSliderParams = sliderParamsByVariant.default
