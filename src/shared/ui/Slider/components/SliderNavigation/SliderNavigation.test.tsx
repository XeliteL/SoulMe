import type { Swiper } from "swiper"
import { afterEach, describe, expect, it, vi } from "vitest"

import SliderRoot from "../SliderRoot"
import SliderTrack from "../SliderTrack"
import SliderNavigation from "./SliderNavigation"

import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react"

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

type SwiperHost = HTMLElement & { swiper?: Swiper | null }

const PREVIOUS = "Предыдущий слайд"
const NEXT = "Следующий слайд"

const slider = (name: string) => (
  <SliderRoot>
    <div data-testid={name}>
      <SliderNavigation />
    </div>
    <SliderTrack>
      <span key="a">a</span>
      <span key="b">b</span>
      <span key="c">c</span>
    </SliderTrack>
  </SliderRoot>
)

const getSwipers = (container: HTMLElement) =>
  Array.from(container.querySelectorAll<SwiperHost>(".swiper")).map(
    (swiperEl) => swiperEl.swiper as Swiper,
  )

const setSwiperState = (swiper: Swiper, state: Partial<Swiper>) => {
  act(() => {
    Object.assign(swiper, state)
    swiper.emit("snapGridLengthChange")
  })
}

describe("SliderNavigation", () => {
  it("slides with the arrows and the pagination bullets", () => {
    const { container } = render(slider("navigation"))
    const [swiper] = getSwipers(container)
    const slidePrev = vi.spyOn(swiper, "slidePrev")
    const slideNext = vi.spyOn(swiper, "slideNext")
    const slideTo = vi.spyOn(swiper, "slideTo")

    Object.assign(swiper.params, { slidesPerGroup: 2 })
    setSwiperState(swiper, {
      isBeginning: false,
      isEnd: false,
      snapGrid: [0, 100, 200],
    })

    fireEvent.click(screen.getByRole("button", { name: PREVIOUS }))
    fireEvent.click(screen.getByRole("button", { name: NEXT }))
    fireEvent.click(screen.getByRole("button", { name: "Слайд 3" }))

    expect(slidePrev).toHaveBeenCalledOnce()
    expect(slideNext).toHaveBeenCalledOnce()
    expect(slideTo).toHaveBeenCalledWith(4)
  })

  it("follows the swiper state: disabled arrows on the edges and the current bullet", () => {
    const { container } = render(slider("navigation"))
    const [swiper] = getSwipers(container)

    setSwiperState(swiper, {
      isBeginning: true,
      isEnd: false,
      snapIndex: 0,
      snapGrid: [0, 100],
    })

    expect(screen.getByRole("button", { name: PREVIOUS })).toBeDisabled()
    expect(screen.getByRole("button", { name: NEXT })).toBeEnabled()
    expect(screen.getByRole("button", { name: "Слайд 1" })).toHaveAttribute(
      "aria-current",
      "true",
    )

    setSwiperState(swiper, { isBeginning: false, isEnd: true, snapIndex: 1 })

    expect(screen.getByRole("button", { name: PREVIOUS })).toBeEnabled()
    expect(screen.getByRole("button", { name: NEXT })).toBeDisabled()
    expect(screen.getByRole("button", { name: "Слайд 2" })).toHaveAttribute(
      "aria-current",
      "true",
    )
  })

  it("controls only the slider of its own SliderRoot", () => {
    const { container } = render(
      <>
        {slider("first")}
        {slider("second")}
      </>,
    )
    const [firstSwiper, secondSwiper] = getSwipers(container)
    const firstSlideNext = vi.spyOn(firstSwiper, "slideNext")
    const secondSlideNext = vi.spyOn(secondSwiper, "slideNext")

    setSwiperState(firstSwiper, { isEnd: false })
    setSwiperState(secondSwiper, { isEnd: false })

    fireEvent.click(
      within(screen.getByTestId("first")).getByRole("button", { name: NEXT }),
    )

    expect(firstSlideNext).toHaveBeenCalledOnce()
    expect(secondSlideNext).not.toHaveBeenCalled()
  })

  it("throws outside SliderRoot", () => {
    vi.spyOn(console, "error").mockImplementation(() => {})

    expect(() => render(<SliderNavigation />)).toThrow(
      "Slider part must be rendered inside SliderRoot",
    )
  })
})
