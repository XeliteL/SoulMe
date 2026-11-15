import { IconName } from "@/shared/ui/Icon"

export const views = ["grid", "list"] as const
export type View = (typeof views)[number]

export const DEFAULT_VIEW: View = "grid"

export const viewOptions: Record<View, { label: string; iconName: IconName }> =
  {
    grid: { label: "Выводить каталог сеткой", iconName: "grid" },
    list: { label: "Выводить каталог списком", iconName: "list" },
  }
