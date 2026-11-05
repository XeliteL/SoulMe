export const NAVIGATION_START_EVENT = "soulme:navigation-start"

declare global {
  interface WindowEventMap {
    [NAVIGATION_START_EVENT]: CustomEvent<string>
  }
}

export const dispatchNavigationStart = (url: string) => {
  window.dispatchEvent(new CustomEvent(NAVIGATION_START_EVENT, { detail: url }))
}
