import { RefObject, useEffect, useLayoutEffect, useRef, useState } from "react"

const updateIndicator = (
  navigation: HTMLElement | null,
  activeButton?: HTMLElement,
) => {
  if (!navigation || !activeButton) return
  const { width, left } = activeButton.getBoundingClientRect()
  const offsetLeft =
    left - navigation.getBoundingClientRect().left - navigation.clientLeft
  navigation.style.setProperty(
    "--tabsNavigationActiveButtonWidth",
    `${width}px`,
  )
  navigation.style.setProperty(
    "--tabsNavigationActiveButtonOffsetLeft",
    `${offsetLeft}px`,
  )
}

const useTabsIndicator = (
  navigationRef: RefObject<HTMLElement | null>,
  buttonRefs: RefObject<Map<string, HTMLButtonElement>>,
  activeId?: string,
) => {
  const activeIdRef = useRef(activeId)
  const [isReady, setIsReady] = useState(false)

  useLayoutEffect(() => {
    activeIdRef.current = activeId
    updateIndicator(
      navigationRef.current,
      activeId ? buttonRefs.current.get(activeId) : undefined,
    )
  }, [activeId, navigationRef, buttonRefs])

  useEffect(() => {
    const navigation = navigationRef.current
    if (!navigation) return

    const update = () => {
      const currentId = activeIdRef.current
      updateIndicator(
        navigation,
        currentId ? buttonRefs.current.get(currentId) : undefined,
      )
    }

    let isActual = true
    document.fonts?.ready.then(() => {
      if (isActual) update()
    })

    const resizeObserver =
      "ResizeObserver" in window ? new ResizeObserver(update) : null
    resizeObserver?.observe(navigation)

    return () => {
      isActual = false
      resizeObserver?.disconnect()
    }
  }, [navigationRef, buttonRefs])

  useEffect(() => {
    let secondFrame = 0
    const firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => setIsReady(true))
    })
    return () => {
      cancelAnimationFrame(firstFrame)
      cancelAnimationFrame(secondFrame)
    }
  }, [])

  return isReady
}

export default useTabsIndicator
