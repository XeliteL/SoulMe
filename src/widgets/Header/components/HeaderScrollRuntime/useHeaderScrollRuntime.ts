import { useEffect } from "react"

const SCROLLED_CLASS = "is-scrolled"

const useHeaderScrollRuntime = () => {
  useEffect(() => {
    if (CSS.supports("animation-timeline: scroll()")) return

    const header = document.querySelector<HTMLElement>(".header")
    if (!header) return

    const controller = new AbortController()
    const update = () =>
      header.classList.toggle(SCROLLED_CLASS, window.scrollY > 0)

    update()
    window.addEventListener("scroll", update, {
      passive: true,
      signal: controller.signal,
    })

    return () => controller.abort()
  }, [])
}

export default useHeaderScrollRuntime
