import type { Anime } from "../model/types"

export const getReleaseYear = ({ released }: Pick<Anime, "released">) =>
  released ? Number(released.dateTime.slice(0, 4)) : undefined
