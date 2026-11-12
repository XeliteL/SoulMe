import { tagLabels } from "@/entities/anime"

import type { Filter } from "../model/filterSchema"

interface CollectionPreset {
  title: string
  filter: Filter
}

export const collectionPresets = {
  trends: { title: "Популярное", filter: { sort: "views" } },
  new: {
    title: "Новые релизы",
    filter: { status: ["ongoing", "released"], sort: "released" },
  },
  recommendation: {
    title: tagLabels["must-watch"],
    filter: { tag: ["must-watch"], sort: "rating" },
  },
} satisfies Record<string, CollectionPreset>

type CollectionPresetKey = keyof typeof collectionPresets

export const isPresetKey = (
  collection: string,
): collection is CollectionPresetKey =>
  Object.hasOwn(collectionPresets, collection)
