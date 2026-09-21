interface AnimeItemBase {
  kind: "anime"
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

type AnimeItem =
  | (AnimeItemBase & { type: "film"; duration: number })
  | (AnimeItemBase & { type: "serial"; episodes: number })

export const AnimeItems: AnimeItem[] = [
  {
    kind: "anime",
    title: "Пожиратель душ",
    type: "serial",
    imgSrc: "/src/shared/assets/images/categories/sonen/1.png",
    episodes: 51,
    views: 2_500_000,
    released: {
      label: "07 Апреля 2008",
      dateTime: "2008-04-07",
    },
    rating: {
      value: 5,
      label: 1_000_000,
    },
    href: "anime/",
  },
  {
    kind: "anime",
    title: "Кэйон!",
    type: "serial",
    imgSrc: "/src/shared/assets/images/categories/music/1.png",
    episodes: 39,
    views: 5_300_000,
    released: {
      label: "03 Апреля 2009",
      dateTime: "2009-04-03",
    },
    rating: {
      value: 4.9,
      label: 3_067_067,
    },
    href: "anime/",
  },
  {
    kind: "anime",
    title: "Гуррен-лаганн",
    type: "serial",
    imgSrc: "/src/shared/assets/images/categories/mecha/1.png",
    episodes: 27,
    views: 2_950_000,
    released: {
      label: "01 Апреля 2007",
      dateTime: "2007-04-01",
    },
    rating: {
      value: 4.8,
      label: 2_280_000,
    },
    href: "anime/",
  },
  {
    kind: "anime",
    title: "Ванпис",
    type: "serial",
    imgSrc: "/src/shared/assets/images/categories/sonen/3.png",
    episodes: 1178,
    views: 20_200_000,
    released: {
      label: "20 Октября 1999",
      dateTime: "1999-10-20",
    },
    rating: {
      value: 4.5,
      label: 10_000_000,
    },
    href: "anime/",
  },
  {
    kind: "anime",
    title: "Акира",
    type: "film",
    imgSrc: "/src/shared/assets/images/categories/films/1.png",
    duration: 124,
    views: 12_150_000,
    released: {
      label: "16 Июля 1988",
      dateTime: "1988-07-16",
    },
    rating: {
      value: 2.7,
      label: 6_767_670,
    },
    href: "anime/",
  },
  {
    kind: "anime",
    title: "Блич",
    type: "serial",
    imgSrc: "/src/shared/assets/images/categories/sonen/4.png",
    episodes: 414,
    views: 2_100_000,
    released: {
      label: "05 Октября 2004",
      dateTime: "2004-10-05",
    },
    rating: {
      value: 3.7,
      label: 800_000,
    },
    href: "anime/",
  },
  {
    kind: "anime",
    title: "Фрирен, провожающая в последний путь",
    type: "serial",
    imgSrc: "/src/shared/assets/images/categories/fantasy/1.png",
    episodes: 38,
    views: 2_050_000,
    released: {
      label: "29 Сентября 2023",
      dateTime: "2023-09-29",
    },
    rating: {
      value: 4.1,
      label: 1_200_000,
    },
    href: "anime/",
  },
  {
    kind: "anime",
    title: "Рок-тихоня!",
    type: "serial",
    imgSrc: "/src/shared/assets/images/categories/music/2.png",
    episodes: 12,
    views: 2_040_000,
    released: {
      label: "09 Октября 2022",
      dateTime: "2022-10-09",
    },
    rating: {
      value: 5,
      label: 2_020_000,
    },
    href: "anime/",
  },
  {
    kind: "anime",
    title: "Человек-бензопила",
    type: "serial",
    imgSrc: "/src/shared/assets/images/categories/seynen/1.png",
    episodes: 12,
    views: 2_030_000,
    released: {
      label: "12 Октября 2022",
      dateTime: "2022-10-12",
    },
    rating: {
      value: 3.4,
      label: 1_000_000,
    },
    href: "anime/",
  },
  {
    kind: "anime",
    title: "Код Гиасс",
    type: "serial",
    imgSrc: "/src/shared/assets/images/categories/mecha/2.png",
    episodes: 50,
    views: 2_000_000,
    released: {
      label: "06 Октября 2006",
      dateTime: "2006-10-06",
    },
    rating: {
      value: 4.7,
      label: 1_500_000,
    },
    href: "anime/",
  },
]
