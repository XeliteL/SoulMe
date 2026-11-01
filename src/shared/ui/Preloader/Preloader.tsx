"use client"

import { useEffect, useState, useSyncExternalStore } from "react"
import classNames from "classnames"
import { usePathname } from "next/navigation"

import { MAX_DURATION, SHOW_DELAY } from "./config/timing"
import {
  getIsLoaded,
  getIsLoadedOnServer,
  subscribeToLoad,
} from "./lib/loadState"
import { NAVIGATION_START_EVENT } from "./lib/navigationStart"

import "./Preloader.scss"

const Preloader = () => {
  const isLoaded = useSyncExternalStore(
    subscribeToLoad,
    getIsLoaded,
    getIsLoadedOnServer,
  )
  const pathname = usePathname()
  const [isNavigating, setIsNavigating] = useState(false)
  const [prevPathName, setPrevPathName] = useState(pathname)

  if (pathname !== prevPathName) {
    setPrevPathName(pathname)
    setIsNavigating(false)
  }

  useEffect(() => {
    let showTimer: ReturnType<typeof setTimeout> | undefined
    let hideTimer: ReturnType<typeof setTimeout> | undefined

    const clearTimers = () => {
      clearTimeout(showTimer)
      clearTimeout(hideTimer)
    }

    const handleNavigationStart = (event: CustomEvent<string>) => {
      clearTimers()
      setIsNavigating(false)

      if (new URL(event.detail, window.location.href).pathname === pathname) {
        return
      }

      showTimer = setTimeout(() => setIsNavigating(true), SHOW_DELAY)
      hideTimer = setTimeout(() => setIsNavigating(false), MAX_DURATION)
    }

    window.addEventListener(NAVIGATION_START_EVENT, handleNavigationStart)

    return () => {
      window.removeEventListener(NAVIGATION_START_EVENT, handleNavigationStart)
      clearTimers()
    }
  }, [pathname])

  return (
    <>
      <div
        className={classNames("preloader", {
          "preloader--hidden": isLoaded && !isNavigating,
        })}
        role="presentation"
      >
        <span className="preloader__bar" />
      </div>
      <noscript>
        <style>{".preloader{display:none}"}</style>
      </noscript>
    </>
  )
}

export default Preloader
