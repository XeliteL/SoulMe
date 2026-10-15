"use client"

import { KeyboardEvent, useRef } from "react"
import classNames from "classnames"

import getNextTabIndex from "../../lib/getNextTabIndex"
import getTabsElementsIds from "../../lib/getTabsElementsIds"
import { useTabsContext } from "../TabsRoot/TabsContext"
import useTabsIndicator from "./useTabsIndicator"

import "./TabsNavigation.scss"

interface TabsNavigationProps {
  className?: string
  title: string
}

const TabsNavigation = ({ className, title }: TabsNavigationProps) => {
  const { items, activeId, setActiveId } = useTabsContext()
  const navigationRef = useRef<HTMLDivElement>(null)
  const buttonRefs = useRef(new Map<string, HTMLButtonElement>())
  const isReady = useTabsIndicator(navigationRef, buttonRefs, activeId)

  const handleKeyDown = (event: KeyboardEvent, index: number) => {
    const nextIndex = getNextTabIndex(event.key, index, items.length)
    if (nextIndex === undefined) return

    event.preventDefault()
    const nextId = items[nextIndex].id
    setActiveId(nextId)
    buttonRefs.current.get(nextId)?.focus()
  }

  return (
    <div
      className={classNames(className, "tabs-navigation", {
        "is-ready": isReady,
      })}
      role="tablist"
      aria-label={title}
      ref={navigationRef}
    >
      {items.map((item, index) => {
        const { buttonId, contentId } = getTabsElementsIds(item.id)
        const isActive = item.id === activeId

        return (
          <button
            className={classNames("tabs-navigation__button", {
              "is-active": isActive,
            })}
            id={buttonId}
            aria-controls={contentId}
            role="tab"
            type="button"
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            ref={(button) => {
              if (button) {
                buttonRefs.current.set(item.id, button)
              } else {
                buttonRefs.current.delete(item.id)
              }
            }}
            onClick={() => setActiveId(item.id)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            key={item.id}
          >
            {item.title}
          </button>
        )
      })}
    </div>
  )
}

export default TabsNavigation
