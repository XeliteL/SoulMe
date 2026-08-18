interface NavigationItem {
  label: string
  href: string
}

export const navigation: NavigationItem[] = [
  { label: "Главная", href: "/" },
  { label: "Аниме", href: "/anime" },
  { label: "Поддержка", href: "/support" },
  { label: "Избранное", href: "/subscriptions" },
]
