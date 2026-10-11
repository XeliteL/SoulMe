import LegalDocument from "@/widgets/LegalDocument"

import { privacyItems } from "../../config/privacyItems"

const PrivacyPage = () => (
  <LegalDocument
    title="Политика конфиденциальности"
    updatedAt="2026-09-24"
    items={privacyItems}
  />
)

export default PrivacyPage
