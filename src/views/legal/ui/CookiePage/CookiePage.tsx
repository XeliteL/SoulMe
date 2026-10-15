import { cookieItems } from "../../config/cookieItems"
import LegalDocument from "../LegalDocument"

const CookiePage = () => (
  <LegalDocument
    title="Использование куки"
    updatedAt="2026-09-24"
    items={cookieItems}
  />
)

export default CookiePage
