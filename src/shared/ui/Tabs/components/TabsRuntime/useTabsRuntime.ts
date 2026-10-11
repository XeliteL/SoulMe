import { useEffect } from "react"

import parseJsonAttribute from "@/shared/utils/parseJsonAttribute"

import { TabsConfig } from "../../types"

const useTabsRuntime = () => {
  useEffect(() => {
    const controller = new AbortController()

    document
      .querySelectorAll<HTMLElement>("[data-js-tabs]")
      .forEach((tabsEl) => {
        const tabsConfig = parseJsonAttribute<TabsConfig>(
          tabsEl,
          "data-js-tabs",
          {},
        )
        const navigationTargetElementId = tabsConfig.navigationTargetElementId
        const navRoot = navigationTargetElementId
          ? (document.getElementById(navigationTargetElementId) ?? tabsEl)
          : tabsEl

        const tabsButtons = Array.from(
          navRoot.querySelectorAll<HTMLElement>("[data-js-tabs-button]"),
        )
        const tabsPairs = tabsButtons.flatMap((button) => {
          const panel = document.getElementById(
            button.getAttribute("aria-controls") ?? "",
          )
          return panel ? [{ button, panel }] : []
        })
        if (!tabsPairs.length) return

        const navigationEl = navRoot.matches("[data-js-tabs-navigation]")
          ? navRoot
          : navRoot.querySelector<HTMLElement>("[data-js-tabs-navigation]")

        const updateNavigationCSSVars = (activeButton: HTMLElement) => {
          if (!navigationEl) return

          const { width, left } = activeButton.getBoundingClientRect()
          const offsetLeft =
            left -
            navigationEl.getBoundingClientRect().left -
            navigationEl.clientLeft

          navigationEl.style.setProperty(
            "--tabsNavigationActiveButtonWidth",
            `${width}px`,
          )
          navigationEl.style.setProperty(
            "--tabsNavigationActiveButtonOffsetLeft",
            `${offsetLeft}px`,
          )
        }

        const getActiveButton = () =>
          tabsPairs.find(({ button }) => button.classList.contains("is-active"))
            ?.button ?? tabsPairs[0].button

        const activate = (targetButton: HTMLElement) => {
          tabsPairs.forEach(({ button, panel }) => {
            const isActive = button === targetButton

            button.classList.toggle("is-active", isActive)
            button.setAttribute("aria-selected", String(isActive))
            button.tabIndex = isActive ? 0 : -1

            panel.classList.toggle("is-active", isActive)
          })

          updateNavigationCSSVars(targetButton)
        }

        updateNavigationCSSVars(getActiveButton())

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (!controller.signal.aborted)
              navigationEl?.classList.add("is-ready")
          })
        })

        if (navigationEl && "ResizeObserver" in window) {
          const resizeObserver = new ResizeObserver(() =>
            updateNavigationCSSVars(getActiveButton()),
          )
          resizeObserver.observe(navigationEl)
          controller.signal.addEventListener("abort", () =>
            resizeObserver.disconnect(),
          )
        }

        document.fonts?.ready.then(() => {
          if (!controller.signal.aborted)
            updateNavigationCSSVars(getActiveButton())
        })

        navRoot.addEventListener(
          "click",
          (event) => {
            if (!(event.target instanceof HTMLElement)) return

            const button = event.target.closest<HTMLElement>(
              "[data-js-tabs-button]",
            )
            if (!button || !tabsPairs.some((pair) => pair.button === button))
              return

            activate(button)
          },
          { signal: controller.signal },
        )

        navRoot.addEventListener(
          "keydown",
          (event) => {
            const index = tabsPairs.findIndex((pair) => {
              return pair.button === event.target
            })
            if (index === -1) return

            const nextIndex: number | undefined = (() => {
              const length = tabsPairs.length

              switch (event.key) {
                case "ArrowRight":
                  return (index + 1) % length
                case "ArrowDown":
                  return (index + 1) % length
                case "ArrowLeft":
                  return (index - 1 + length) % length
                case "ArrowUp":
                  return (index - 1 + length) % length
                case "Home":
                  return 0
                case "End":
                  return length - 1
                default:
                  return
              }
            })()
            if (nextIndex === undefined) return

            event.preventDefault()

            const nextButton = tabsPairs[nextIndex].button
            nextButton.focus()
            activate(nextButton)
          },
          { signal: controller.signal },
        )
      })

    return () => controller.abort()
  }, [])
}

export default useTabsRuntime
