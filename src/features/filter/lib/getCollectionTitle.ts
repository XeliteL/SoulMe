import { categoryItems } from "@/entities/category"

import { collectionPresets, isPresetKey } from "../config/collectionPresets"

export const getCollectionTitle = (collection?: string) => {
  if (!collection) return undefined
  if (isPresetKey(collection)) return collectionPresets[collection].title

  return categoryItems.find((category) => category.id === collection)?.title
}
