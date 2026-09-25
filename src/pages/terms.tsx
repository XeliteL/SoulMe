import LegalDocument from "@/sections/LegalDocument"
import { termsItems } from "@/sections/LegalDocument/config/termsItems"

export const metadata = {
  title: "Условия использования",
}

export default function () {
  return (
    <LegalDocument
      title="Условия использования"
      updatedAt="2026-09-24"
      items={termsItems}
    />
  )
}
