import { useEffect } from "react"

const getGrayedHref = (href: string) => href.replace(/(\.\w+)$/, "_grayed$1")

const useGrayFavicon = () => {
  useEffect(() => {
    const handleVisibilityChange = () => {
      document
        .querySelectorAll<HTMLLinkElement>('link[rel="icon"]')
        .forEach((favicon) => {
          favicon.dataset.href ??= favicon.getAttribute("href") ?? ""
          favicon.href = document.hidden
            ? getGrayedHref(favicon.dataset.href)
            : favicon.dataset.href
        })
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange)
  }, [])
}

export default useGrayFavicon
