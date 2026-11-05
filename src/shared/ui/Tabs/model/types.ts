import { ReactNode } from "react"

export interface TabsNavigationItem {
  id: string
  title: string
  isActive?: boolean
}

export interface TabItem extends TabsNavigationItem {
  children?: ReactNode
}
