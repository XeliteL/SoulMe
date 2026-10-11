import { useId } from "react"

export const useBaseId = (id?: string) => {
  const generatedId = useId()
  return id || generatedId
}
