import { afterEach, describe, expect, it } from "vitest"

import Support from "./Support"

import { cleanup, render, screen } from "@testing-library/react"

afterEach(() => {
  cleanup()
})

describe("Support", () => {
  it("requires agreeing to the documents before sending", () => {
    render(<Support />)

    expect(screen.getByRole("checkbox", { name: /соглашаюсь/ })).toBeRequired()
  })

  it("offers a phone code with +7 by default", () => {
    render(<Support />)

    const [nativeSelect] = screen.getAllByRole("combobox", {
      name: "Телефонный код страны",
    })

    expect(nativeSelect).toHaveValue("+7")
    expect(nativeSelect).toHaveAttribute("name", "phoneCode")
  })

  it("names every field for form submission", () => {
    const { container } = render(<Support />)
    const form = container.querySelector("form")!

    expect([...new FormData(form).keys()]).toEqual(
      expect.arrayContaining([
        "firstname",
        "lastname",
        "email",
        "phoneCode",
        "phone",
        "message",
      ]),
    )
  })

  it.each([
    ["условиями использования", "/legal/terms"],
    ["политикой конфиденциальности", "/legal/privacy"],
  ])("links «%s» to %s in a new tab", (name, href) => {
    render(<Support />)

    const link = screen.getByRole("link", { name })

    expect(link).toHaveAttribute("href", href)
    expect(link).toHaveAttribute("target", "_blank")
    expect(link).toHaveAttribute("rel", "noopener noreferrer")
  })
})
