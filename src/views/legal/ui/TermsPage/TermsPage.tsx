import LegalDocument from "@/widgets/LegalDocument"

import { termsItems } from "../../config/termsItems"

const TermsPage = () => (
  <LegalDocument
    title="Условия использования"
    updatedAt="2026-09-24"
    items={termsItems}
  />
)

export default TermsPage
