export type SliderVariant = "default" | "banner"

const shared = {
  mousewheel: { forceToAxis: true },
}

export const sliderParamsByVariant: Record<
  SliderVariant,
  typeof shared & {
    breakpoints: Record<
      number,
      {
        slidesPerView: number
        slidesPerGroup: number
        spaceBetween: number
        allowTouchMove?: boolean
      }
    >
  }
> = {
  default: {
    ...shared,
    breakpoints: {
      0: {
        slidesPerView: 2,
        slidesPerGroup: 1,
        spaceBetween: 20,
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
        allowTouchMove: false,
      },
      1200: {
        slidesPerView: 5,
        slidesPerGroup: 5,
        spaceBetween: 20,
        allowTouchMove: false,
      },
      1441: {
        slidesPerView: 5,
        slidesPerGroup: 5,
        spaceBetween: 30,
        allowTouchMove: false,
      },
      2000: {
        slidesPerView: 6,
        slidesPerGroup: 6,
        spaceBetween: 30,
        allowTouchMove: false,
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
        allowTouchMove: false,
      },
      1200: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 20,
        allowTouchMove: false,
      },
      1441: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 30,
        allowTouchMove: false,
      },
    },
  },
}

export const defaultSliderParams = sliderParamsByVariant.default
