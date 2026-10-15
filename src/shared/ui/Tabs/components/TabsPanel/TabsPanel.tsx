"use client"

import { ReactNode } from "react"
import classNames from "classnames"

import getTabsElementsIds from "../../lib/getTabsElementsIds"
import { useTabsContext } from "../TabsRoot/TabsContext"

interface TabsPanelProps {
  id: string
  children?: ReactNode
}

const TabsPanel = ({ id, children }: TabsPanelProps) => {
  const { activeId } = useTabsContext()
  const { buttonId, contentId } = getTabsElementsIds(id)

  return (
    <div
      className={classNames("tabs__content", {
        "is-active": id === activeId,
      })}
      id={contentId}
      role="tabpanel"
      aria-labelledby={buttonId}
      tabIndex={0}
    >
      {children}
    </div>
  )
}

export default TabsPanel
