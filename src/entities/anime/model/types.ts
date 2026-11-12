interface AnimeBase {
  kind: "anime"
  id: string
  title: string
  originalTitle: string
  description: string
  ageRating: AnimeAgeRating
  genres: AnimeGenre[]
  imgSrc: string
  views: number
  rating: {
    value: number
    reviewsCount: number
  }
  tags?: AnimeTag[]
}

export type AnimeGenre =
  | "action"
  | "adventure"
  | "comedy"
  | "detective"
  | "drama"
  | "fantasy"
  | "gourmet"
  | "historical"
  | "horror"
  | "isekai"
  | "josei"
  | "martial-arts"
  | "mecha"
  | "military"
  | "music"
  | "mystic"
  | "parody"
  | "psychological"
  | "romance"
  | "school"
  | "sci-fi"
  | "seinen"
  | "shoujo"
  | "shounen"
  | "slice-of-life"
  | "sport"
  | "supernatural"
  | "thriller"

export type AnimeTag = "must-watch"

export type AnimeAgeRating = "g" | "pg" | "pg-13" | "r-17" | "r-plus"

type AnimeExtraType = "ova" | "ona" | "special"

export type AnimeType = "film" | "serial" | AnimeExtraType

export type AnimeStatus = "announced" | "ongoing" | "released"

interface AnimeRelease {
  label: string
  dateTime: string
}

type AnimeRuntime =
  | { type: "film" | AnimeExtraType; duration: number }
  | { type: "serial" | AnimeExtraType; episodes: number }

export type Anime =
  | (AnimeBase & {
      status: "announced"
      type: AnimeType
      released?: AnimeRelease
    })
  | (AnimeBase & {
      status: "ongoing" | "released"
      released: AnimeRelease
    } & AnimeRuntime)

export interface AnimeBanner {
  animeId: string
  description: string
  imgSrc: string
}
