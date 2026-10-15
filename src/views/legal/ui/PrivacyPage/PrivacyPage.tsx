import { privacyItems } from "../../config/privacyItems"
import LegalDocument from "../LegalDocument"

const PrivacyPage = () => (
  <LegalDocument
    title="Политика конфиденциальности"
    updatedAt="2026-09-24"
    items={privacyItems}
  />
)

export default PrivacyPage
