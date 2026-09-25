import LegalDocument from "@/sections/LegalDocument"
import { privacyItems } from "@/sections/LegalDocument/config/privacyItems"

export const metadata = {
  title: "Политика конфиденциальности",
}

export default function () {
  return (
    <LegalDocument
      title="Политика конфиденциальности"
      updatedAt="2026-09-24"
      items={privacyItems}
    />
  )
}
