"use client"

import { Fragment, ReactNode } from "react"
import classNames from "classnames"

import getTabsElementsIds from "../../lib/getTabsElementsIds"
import { useTabsContext } from "../TabsRoot/TabsContext"

interface TabsPanelProps {
  id: string
  children?: ReactNode
}

const TabsPanel = ({ id, children }: TabsPanelProps) => {
  const { activeId, shouldResetInactive } = useTabsContext()
  const { buttonId, contentId } = getTabsElementsIds(id)
  const isActive = id === activeId

  return (
    <div
      className={classNames("tabs__content", { "is-active": isActive })}
      id={contentId}
      role="tabpanel"
      aria-labelledby={buttonId}
      tabIndex={0}
    >
      {shouldResetInactive ? (
        <Fragment key={isActive ? "active" : "inactive"}>{children}</Fragment>
      ) : (
        children
      )}
    </div>
  )
}

export default TabsPanel
