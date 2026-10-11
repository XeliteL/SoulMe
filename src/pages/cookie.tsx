import LegalDocument from "@/sections/LegalDocument"
import { cookieItems } from "@/sections/LegalDocument/config/cookieItems"

export const metadata = {
  title: "Использование куки",
}

export default function () {
  return (
    <LegalDocument
      title="Использование куки"
      updatedAt="2026-09-24"
      items={cookieItems}
    />
  )
}
