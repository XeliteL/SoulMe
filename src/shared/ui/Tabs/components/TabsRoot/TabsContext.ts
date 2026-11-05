"use client"

import { createContext, useContext } from "react"

import { TabsNavigationItem } from "../../model/types"

interface TabsContextValue {
  items: TabsNavigationItem[]
  activeId?: string
  setActiveId: (id: string) => void
  shouldResetInactive?: boolean
}

export const TabsContext = createContext<TabsContextValue | null>(null)

export const useTabsContext = () => {
  const context = useContext(TabsContext)
  if (!context) throw new Error("Tabs part must be rendered inside TabsRoot")
  return context
}
