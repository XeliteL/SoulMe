interface DeviceItem {
  id: string
  title: string
  description: string
  imgSrc: string
}

export const deviceItems: DeviceItem[] = [
  {
    id: "mobile",
    title: "Телефон",
    description: "Смотри аниме со смартфона в любой точке мира.",
    imgSrc: "/devices/mobile.svg",
  },
  {
    id: "tablet",
    title: "Планшет",
    description: "Открывай любимые тайтлы на большом экране планшета.",
    imgSrc: "/devices/tablet.svg",
  },
  {
    id: "laptop",
    title: "Ноутбук",
    description: "Смотри в высоком качестве прямо на ноутбуке.",
    imgSrc: "/devices/laptop.svg",
  },
  {
    id: "tv",
    title: "ТВ",
    description: "Наслаждайся аниме на большом экране телевизора.",
    imgSrc: "/devices/tv.svg",
  },
]
