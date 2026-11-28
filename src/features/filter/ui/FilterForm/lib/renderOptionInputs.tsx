import type { TriState } from "@/shared/ui/TristateCheckbox"

interface OptionInputConfig {
  includeName: string
  excludeName: string
  matchName: string
  isStrict: boolean
}

export function renderOptionInputs<T extends string>(
  ids: readonly T[],
  states: Partial<Record<T, TriState>>,
  { includeName, excludeName, matchName, isStrict }: OptionInputConfig,
) {
  return (
    <>
      {ids.map((id) => {
        const state = states[id]
        if (!state || state === "none") return null

        return (
          <input
            key={id}
            type="hidden"
            name={state === "include" ? includeName : excludeName}
            value={id}
          />
        )
      })}
      {isStrict && <input type="hidden" name={matchName} value="all" />}
    </>
  )
}
