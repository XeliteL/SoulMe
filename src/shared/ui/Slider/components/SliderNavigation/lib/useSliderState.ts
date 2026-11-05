import { useCallback, useSyncExternalStore } from "react"
import type { Swiper } from "swiper"
import type { SwiperEvents } from "swiper/types"

const STATE_EVENTS: (keyof SwiperEvents)[] = [
  "progress",
  "slideChange",
  "snapGridLengthChange",
  "breakpoint",
  "update",
]

const useSliderState = (swiper: Swiper | null) => {
  const subscribe = useCallback(
    (onChange: () => void) => {
      if (!swiper) return () => {}

      STATE_EVENTS.forEach((event) => swiper.on(event, onChange))

      return () => STATE_EVENTS.forEach((event) => swiper.off(event, onChange))
    },
    [swiper],
  )

  const isBeginning = useSyncExternalStore(
    subscribe,
    () => swiper?.isBeginning ?? true,
    () => true,
  )

  const isEnd = useSyncExternalStore(
    subscribe,
    () => swiper?.isEnd ?? false,
    () => false,
  )

  const snapIndex = useSyncExternalStore(
    subscribe,
    () => swiper?.snapIndex ?? 0,
    () => 0,
  )

  const snapCount = useSyncExternalStore(
    subscribe,
    () => swiper?.snapGrid.length ?? 0,
    () => 0,
  )

  return { isBeginning, isEnd, snapIndex, snapCount }
}

export default useSliderState
