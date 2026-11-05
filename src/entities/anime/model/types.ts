interface AnimeBase {
  kind: "anime"
  id: string
  title: string
  imgSrc: string
  views: number
  released: {
    label: string
    dateTime: string
  }
  rating: {
    value: number
    label: number
  }
  href: string
}

export type Anime =
  | (AnimeBase & { type: "film"; duration: number })
  | (AnimeBase & { type: "serial"; episodes: number })

export interface AnimeBanner {
  id: string
  title: string
  description: string
  imgSrc: string
}
