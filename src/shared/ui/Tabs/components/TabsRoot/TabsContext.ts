"use client"

import { createContext, useContext } from "react"

import { TabItem } from "../../model/types"

interface TabsContextValue {
  items: TabItem[]
  activeId?: string
  setActiveId: (id: string) => void
}

export const TabsContext = createContext<TabsContextValue | null>(null)

export const useTabsContext = () => {
  const context = useContext(TabsContext)
  if (!context) throw new Error("Tabs part must be rendered inside TabsRoot")
  return context
}
