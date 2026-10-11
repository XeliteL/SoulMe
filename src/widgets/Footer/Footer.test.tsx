import { afterEach, describe, expect, it } from "vitest"

import Footer from "./Footer"

import { cleanup, render, screen } from "@testing-library/react"

afterEach(() => {
  cleanup()
})

describe("Footer", () => {
  it("renders every section type without throwing", () => {
    render(<Footer />)

    expect(screen.getByRole("link", { name: "Аниме" })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Поддержка" })).toBeInTheDocument()
    expect(screen.getByText("Наши соцсети")).toBeInTheDocument()
  })

  it("opens external links from a links section in a new tab", () => {
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

    const socials = screen.getByText("Наши соцсети")

    expect(socials.tagName).toBe("A")
    expect(socials).not.toHaveAttribute("href")
    expect(socials).toHaveClass("footer__menu-title--static")
  })

  it("keeps the href and drops the static class for sections with a titleHref", () => {
    render(<Footer />)

    const anime = screen.getByRole("link", { name: "Аниме" })

    expect(anime).toHaveAttribute("href", "/anime")
    expect(anime).not.toHaveClass("footer__menu-title--static")
  })

  it("links the support section title to the support page", () => {
    render(<Footer />)

    const support = screen.getByRole("link", { name: "Поддержка" })

    expect(support).toHaveAttribute("href", "/support")
    expect(support).not.toHaveClass("footer__menu-title--static")
  })

  it("links support items to anchors on the support page", () => {
    render(<Footer />)

    const askQuestion = screen.getByRole("link", { name: "Задать вопрос" })
    const faqHrefs = screen
      .getAllByRole("link", { name: "FAQ" })
      .map((link) => link.getAttribute("href"))

    expect(askQuestion).toHaveAttribute("href", "/support#form")
    expect(askQuestion).not.toHaveAttribute("target")
    expect(faqHrefs).toContain("/support#questions")
  })

  it("renders extra legal links as same-tab internal links with rel set", () => {
    render(<Footer />)

    const terms = screen.getByRole("link", { name: "Условия использования" })

    expect(terms).toHaveAttribute("href", "/terms")
    expect(terms).not.toHaveAttribute("target")
    expect(terms).toHaveAttribute("rel", "noopener noreferrer")
  })
})
