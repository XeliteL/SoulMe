import { afterEach, describe, expect, it } from "vitest"

import SupportForm from "./SupportForm"

import { cleanup, render, screen } from "@testing-library/react"

afterEach(() => {
  cleanup()
})

describe("SupportForm", () => {
  it("requires agreeing to the documents before sending", () => {
    render(<SupportForm />)

    expect(screen.getByRole("checkbox", { name: /соглашаюсь/ })).toBeRequired()
  })

  it("offers a phone code with +7 by default", () => {
    render(<SupportForm />)

    const [nativeSelect] = screen.getAllByRole("combobox", {
      name: "Телефонный код страны",
    })

    expect(nativeSelect).toHaveValue("+7")
    expect(nativeSelect).toHaveAttribute("name", "phoneCode")
  })

  it("names every field for form submission", () => {
    const { container } = render(<SupportForm />)
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
    render(<SupportForm />)

    const link = screen.getByRole("link", { name })

    expect(link).toHaveAttribute("href", href)
    expect(link).toHaveAttribute("target", "_blank")
    expect(link).toHaveAttribute("rel", "noopener noreferrer")
  })
})
