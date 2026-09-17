interface DeviceItem {
  title: string
  description: string
  imgSrc: string
}

export const deviceItems: DeviceItem[] = [
  {
    title: "Телефон",
    description: "Смотри аниме со смартфона в любой точке мира.",
    imgSrc: "/devices/mobile.svg",
  },
  {
    title: "Планшет",
    description: "Открывай любимые тайтлы на большом экране планшета.",
    imgSrc: "/devices/tablet.svg",
  },
  {
    title: "Ноутбук",
    description: "Смотри в высоком качестве прямо на ноутбуке.",
    imgSrc: "/devices/laptop.svg",
  },
  {
    title: "ТВ",
    description: "Наслаждайся аниме на большом экране телевизора.",
    imgSrc: "/devices/tv.svg",
  },
]
