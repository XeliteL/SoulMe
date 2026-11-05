export const subscribeToLoad = (onLoad: () => void) => {
  window.addEventListener("load", onLoad)
  return () => window.removeEventListener("load", onLoad)
}

export const getIsLoaded = () => document.readyState === "complete"

export const getIsLoadedOnServer = () => false
