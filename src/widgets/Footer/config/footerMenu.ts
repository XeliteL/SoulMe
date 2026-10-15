import type { IconName } from "@/shared/ui/Icon"

interface FooterLink {
  label: string
  href: string
  newTab?: boolean
}

interface FooterSocialLink extends FooterLink {
  iconName: IconName
}

interface FooterSectionBase {
  title: string
  titleHref?: string
}

interface FooterLinksSection extends FooterSectionBase {
  type: "links"
  links: FooterLink[]
}

interface FooterSocialSection extends FooterSectionBase {
  type: "social"
  socialLinks: FooterSocialLink[]
}

export type FooterMenuSection = FooterLinksSection | FooterSocialSection

export const footerMenu: FooterMenuSection[] = [
  {
    type: "links",
    title: "Главная",
    titleHref: "/",
    links: [
      { label: "Категории", href: "/#categories" },
      { label: "Устройства", href: "/#devices" },
      { label: "FAQ", href: "/#questions" },
    ],
  },
  {
    type: "links",
    title: "Аниме",
    titleHref: "/anime",
    links: [
      { label: "Наши жанры", href: "/anime#genres" },
      { label: "Топ 10 в жанрах", href: "/anime#top" },
      { label: "Популярное", href: "/anime#trends" },
      { label: "Новые релизы", href: "/anime#new" },
      { label: "Обязательно посмотрите", href: "/anime#recommendation" },
    ],
  },
  {
    type: "links",
    title: "Закладки",
    titleHref: "/markers",
    links: [
      { label: "Все", href: "/markers#all" },
      { label: "В планах", href: "/markers#plans" },
      { label: "Смотрите", href: "/markers#watching" },
      { label: "Просмотрено", href: "/markers#watched" },
      { label: "Избранное", href: "/markers#favorites" },
    ],
  },
  {
    type: "links",
    title: "Новости",
    titleHref: "/news",
    links: [
      { label: "Анонсы", href: "/news#announcements" },
      { label: "Расписание", href: "/news#schedule" },
    ],
  },
  {
    type: "links",
    title: "Поддержка",
    titleHref: "/support",
    links: [
      { label: "Задать вопрос", href: "/support#form" },
      { label: "FAQ", href: "/support#questions" },
      { label: "Контакты", href: "https://t.me/soulmesup", newTab: true },
    ],
  },
  {
    type: "social",
    title: "Наши соцсети",
    socialLinks: [
      {
        label: "Telegram",
        href: "https://t.me/soulmetg",
        iconName: "telegram",
        newTab: true,
      },
      {
        label: "GitHub",
        href: "https://github.com/XeliteL/SoulMe",
        iconName: "github",
        newTab: true,
      },
    ],
  },
]
