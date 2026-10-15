import { termsItems } from "../../config/termsItems"
import LegalDocument from "../LegalDocument"

const TermsPage = () => (
  <LegalDocument
    title="Условия использования"
    updatedAt="2026-09-24"
    items={termsItems}
  />
)

export default TermsPage
