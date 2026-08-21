import { afterEach, describe, expect, it } from "vitest"
import { cleanup, render, screen } from "@testing-library/react"
import Footer from "./Footer"

afterEach(() => {
  cleanup()
})

describe("Footer", () => {
  it("renders every section type without throwing", () => {
    render(<Footer />)

    expect(screen.getByRole("link", { name: "Аниме" })).toBeInTheDocument()
    expect(screen.getByText("Поддержка")).toBeInTheDocument()
  })

  it("renders a text-type section (no titleHref) as a plain link list, not Socials", () => {
    render(<Footer />)

    const contacts = screen.getByRole("link", { name: "Контакты" })

    expect(contacts).toHaveAttribute("href", "https://t.me/soulmesup")
    expect(contacts).toHaveAttribute("target", "_blank")
    expect(contacts).toHaveAttribute("rel", "noopener noreferrer")
  })

  it("renders the social section through Socials", () => {
    render(<Footer />)

    const telegram = screen.getByRole("link", { name: "Telegram" })

    expect(telegram).toHaveAttribute("href", "https://t.me/soulmetg")
    expect(telegram).toHaveAttribute("target", "_blank")
    expect(telegram).toHaveAttribute("rel", "noopener noreferrer")
  })

  it("does not open same-site anchor links in a new tab", () => {
    render(<Footer />)

    const categories = screen.getByRole("link", { name: "Категории" })

    expect(categories).toHaveAttribute("href", "/#categories")
    expect(categories).not.toHaveAttribute("target")
    expect(categories).not.toHaveAttribute("rel")
  })

  it("marks section titles without a titleHref as static (no href, no hover highlight)", () => {
    render(<Footer />)

    const support = screen.getByText("Поддержка")
    const socials = screen.getByText("Наши соцсети")

    for (const title of [support, socials]) {
      expect(title.tagName).toBe("A")
      expect(title).not.toHaveAttribute("href")
      expect(title).toHaveClass("footer__menu-title--static")
    }
  })

  it("keeps the href and drops the static class for sections with a titleHref", () => {
    render(<Footer />)

    const anime = screen.getByRole("link", { name: "Аниме" })

    expect(anime).toHaveAttribute("href", "/anime")
    expect(anime).not.toHaveClass("footer__menu-title--static")
  })

  it("renders extra legal links as same-tab internal links with rel set", () => {
    render(<Footer />)

    const terms = screen.getByRole("link", { name: "Условия использования" })

    expect(terms).toHaveAttribute("href", "/terms")
    expect(terms).not.toHaveAttribute("target")
    expect(terms).toHaveAttribute("rel", "noopener noreferrer")
  })
})
