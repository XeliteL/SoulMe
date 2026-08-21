interface NavigationItem {
  label: string
  href: string
}

export const navigation: NavigationItem[] = [
  { label: "Главная", href: "/" },
  { label: "Аниме", href: "/anime" },
  { label: "Закладки", href: "/markers" },
  { label: "Новости", href: "/news" },
]
