import type { IconName } from "@/shared/ui/Icon/Icon"

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
  type: "links" | "text"
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
      { label: "FAQ", href: "/#faq" },
      { label: "Подписка", href: "/#subscription" },
    ],
  },
  {
    type: "links",
    title: "Аниме",
    titleHref: "/anime",
    links: [
      { label: "Жанры", href: "/anime#genres" },
      { label: "Рейтинг", href: "/anime#rating" },
      { label: "Новинки", href: "/anime#new" },
      { label: "В тренде", href: "/anime#trends" },
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
      { label: "Выходят сегодня", href: "/news#today" },
    ],
  },
  {
    type: "text",
    title: "Поддержка",
    links: [
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
    ],
  },
]
