import { useEffect } from "react"

const useGrayFavicon = () => {
  useEffect(() => {
    const favicon = document.querySelector<HTMLLinkElement>('link[rel="icon"]')
    if (!favicon) return

    const handleVisibilityChange = () => {
      favicon.href = `/favicon${document.hidden ? "_grayed" : ""}.ico`
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange)
  }, [])
}

export default useGrayFavicon
