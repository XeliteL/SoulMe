import { useEffect } from "react"
import { Swiper } from "swiper"
import { Mousewheel, Navigation, Pagination, Scrollbar } from "swiper/modules"

import { defaultSliderParams } from "./sliderParams"

const useSliderRuntime = () => {
  useEffect(() => {
    const instances: Swiper[] = []

    document
      .querySelectorAll<HTMLElement>("[data-js-slider]")
      .forEach((sliderEl) => {
        const swiperEl = sliderEl.querySelector<HTMLElement>(".swiper")
        if (!swiperEl) return

        const navigationTargetId = sliderEl.getAttribute(
          "data-slider-navigation-target",
        )
        const navRoot = navigationTargetId
          ? (document.getElementById(navigationTargetId) ?? sliderEl)
          : sliderEl

        instances.push(
          new Swiper(swiperEl, {
            modules: [Navigation, Pagination, Scrollbar, Mousewheel],
            ...defaultSliderParams,
            navigation: {
              prevEl: navRoot.querySelector<HTMLElement>(
                ".slider-navigation__arrow-button--previous",
              ),
              nextEl: navRoot.querySelector<HTMLElement>(
                ".slider-navigation__arrow-button--next",
              ),
            },
            pagination: {
              el: navRoot.querySelector<HTMLElement>(
                ".slider-navigation__pagination",
              ),
              clickable: true,
              bulletClass: "slider-navigation__pagination-bullet",
              bulletActiveClass: "is-active",
            },
            scrollbar: {
              el: sliderEl.querySelector<HTMLElement>(".slider__scrollbar"),
              dragClass: "slider__scrollbar-drag",
            },
          }),
        )
      })

    return () => {
      instances.forEach((instance) => instance.destroy(true, true))
    }
  }, [])
}

export default useSliderRuntime
