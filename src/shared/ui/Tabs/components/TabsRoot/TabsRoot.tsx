"use client"

import { ReactNode, useState } from "react"

import { TabItem } from "../../types"
import { TabsContext } from "./TabsContext"

interface TabsRootProps {
  items: TabItem[]
  children: ReactNode
}

const TabsRoot = ({ items, children }: TabsRootProps) => {
  const [activeId, setActiveId] = useState(
    () => (items.find((item) => item.isActive) ?? items[0])?.id,
  )

  return (
    <TabsContext value={{ items, activeId, setActiveId }}>
      {children}
    </TabsContext>
  )
}

export default TabsRoot
