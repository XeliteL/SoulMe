"use client"

import { ReactNode, useState } from "react"

import { TabItem } from "../../model/types"
import { TabsContext } from "./TabsContext"

interface TabsRootProps {
  items: TabItem[]
  children: ReactNode
  shouldResetInactive?: boolean
}

const TabsRoot = ({ items, children, shouldResetInactive }: TabsRootProps) => {
  const [activeId, setActiveId] = useState(
    () => (items.find((item) => item.isActive) ?? items[0])?.id,
  )

  return (
    <TabsContext value={{ items, activeId, setActiveId, shouldResetInactive }}>
      {children}
    </TabsContext>
  )
}

export default TabsRoot
