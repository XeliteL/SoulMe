import { ReactNode } from "react"

export interface TabItem {
  id: string
  title: string
  isActive?: boolean
  children?: ReactNode
}

export interface TabsConfig {
  navigationTargetElementId?: string
}
