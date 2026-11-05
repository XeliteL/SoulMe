import type { IconName } from "@/shared/ui/Icon"

interface ProvidersLink {
  id: string
  iconName: IconName
  label: string
}

export const socialProviders: ProvidersLink[] = [
  {
    id: "telegram",
    iconName: "telegram",
    label: "Telegram",
  },
  {
    id: "shikimori",
    iconName: "shikimori",
    label: "Shikimori",
  },
  {
    id: "google",
    iconName: "google",
    label: "Google",
  },
  {
    id: "yandex",
    iconName: "yandex",
    label: "Yandex",
  },
  {
    id: "discord",
    iconName: "discord",
    label: "Discord",
  },
]
