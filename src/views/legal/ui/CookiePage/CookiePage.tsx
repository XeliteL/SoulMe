import LegalDocument from "@/widgets/LegalDocument"

import { cookieItems } from "../../config/cookieItems"

const CookiePage = () => (
  <LegalDocument
    title="Использование куки"
    updatedAt="2026-09-24"
    items={cookieItems}
  />
)

export default CookiePage
