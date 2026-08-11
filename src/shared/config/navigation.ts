interface NavigationItem {
  label: string
  href: string
}

export const navigation: NavigationItem[] = [
  { label: "Home", href: "/" },
  { label: "Anime", href: "/anime" },
  { label: "Support", href: "/support" },
  { label: "Subscriptions", href: "/subscriptions" },
]
