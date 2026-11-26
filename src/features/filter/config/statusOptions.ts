import { type AnimeStatus, statusLabels } from "@/entities/anime"

export type StatusOption = AnimeStatus | "recent"

export const statusOptions: Record<StatusOption, string> = {
  ...statusLabels,
  recent: "Новинка",
}

export const statusKeys = Object.keys(statusOptions) as StatusOption[]
