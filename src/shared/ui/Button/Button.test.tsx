import type { ComponentProps } from "react"
import { afterEach, describe, expect, it, vi } from "vitest"

import Button from "./Button"

import { cleanup, render, screen } from "@testing-library/react"

vi.mock("next/link", () => ({
  default: ({ children, ...props }: ComponentProps<"a">) => (
    <a data-next-link="" {...props}>
      {children}
    </a>
  ),
}))

afterEach(() => {
  cleanup()
})

describe("Button", () => {
  it("renders a button with type button by default", () => {
    render(<Button label="Отправить" />)

    const button = screen.getByRole("button", { name: "Отправить" })

    expect(button.tagName).toBe("BUTTON")
    expect(button).toHaveAttribute("type", "button")
  })

  it("passes the type through to the button", () => {
    render(<Button type="submit" label="Отправить" />)

    expect(screen.getByRole("button", { name: "Отправить" })).toHaveAttribute(
      "type",
      "submit",
    )
  })

  it("renders internal hrefs through next/link without target and rel", () => {
    render(<Button href="/support" label="Задать вопрос" />)

    const link = screen.getByRole("link", { name: "Задать вопрос" })

    expect(link).toHaveAttribute("data-next-link")
    expect(link).toHaveAttribute("href", "/support")
    expect(link).not.toHaveAttribute("target")
    expect(link).not.toHaveAttribute("rel")
  })

  it("renders external hrefs as a plain anchor", () => {
    render(<Button href="https://t.me/soulmetg" label="Telegram" />)

    const link = screen.getByRole("link", { name: "Telegram" })

    expect(link).not.toHaveAttribute("data-next-link")
    expect(link).toHaveAttribute("href", "https://t.me/soulmetg")
  })

  it("renders internal hrefs opened in a new tab as a plain anchor with rel", () => {
    render(<Button href="/legal/terms" target="_blank" label="Условия" />)

    const link = screen.getByRole("link", { name: "Условия" })

    expect(link).not.toHaveAttribute("data-next-link")
    expect(link).toHaveAttribute("target", "_blank")
    expect(link).toHaveAttribute("rel", "noopener noreferrer")
  })

  it("moves a hidden label into title and aria-label", () => {
    const { container } = render(
      <Button label="Меню" isLabelHidden iconName="arrow-right" />,
    )

    const button = screen.getByRole("button", { name: "Меню" })

    expect(button).toHaveAttribute("title", "Меню")
    expect(button).toHaveAttribute("aria-label", "Меню")
    expect(container.querySelector(".button__label")).toBeNull()
  })
})
