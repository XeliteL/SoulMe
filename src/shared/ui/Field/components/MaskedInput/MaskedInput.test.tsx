import IMask from "imask"
import { afterEach, describe, expect, it, vi } from "vitest"

import Field from "../../Field"
import MaskedInput from "./MaskedInput"

import { cleanup, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

vi.mock("imask", async (importOriginal) => {
  const original = await importOriginal<typeof import("imask")>()

  return { ...original, default: vi.fn(original.default) }
})

const PHONE_MASK = "(000) 000-00-00"

afterEach(() => {
  cleanup()
  vi.mocked(IMask).mockClear()
})

describe("MaskedInput", () => {
  it("formats typed digits by the mask", async () => {
    render(<MaskedInput aria-label="Телефон" mask={PHONE_MASK} />)
    const input = screen.getByLabelText("Телефон")

    await userEvent.type(input, "9991234567")

    expect(input).toHaveValue("(999) 123-45-67")
  })

  it("rejects characters the mask does not accept", async () => {
    render(<MaskedInput aria-label="Телефон" mask={PHONE_MASK} />)
    const input = screen.getByLabelText("Телефон")

    await userEvent.type(input, "9a9b9")

    expect(input).toHaveValue("(999")
  })

  it("passes input attributes through", () => {
    render(
      <MaskedInput
        aria-label="Телефон"
        className="field__control"
        placeholder="(999) 999-99-99"
        inputMode="tel"
        required
        mask={PHONE_MASK}
      />,
    )
    const input = screen.getByLabelText("Телефон")

    expect(input).toHaveClass("field__control")
    expect(input).toHaveAttribute("placeholder", "(999) 999-99-99")
    expect(input).toHaveAttribute("inputmode", "tel")
    expect(input).toBeRequired()
  })

  it("destroys the mask on unmount", () => {
    const { unmount } = render(
      <MaskedInput aria-label="Телефон" mask={PHONE_MASK} />,
    )
    const maskInstance = vi.mocked(IMask).mock.results[0].value
    const destroy = vi.spyOn(maskInstance, "destroy")

    unmount()

    expect(destroy).toHaveBeenCalledTimes(1)
  })

  it("recreates the mask when the mask prop changes", async () => {
    const { rerender } = render(
      <MaskedInput aria-label="Код" mask={PHONE_MASK} />,
    )

    rerender(<MaskedInput aria-label="Код" mask="0000" />)
    const input = screen.getByLabelText("Код")

    await userEvent.type(input, "123456")

    expect(input).toHaveValue("1234")
    expect(IMask).toHaveBeenCalledTimes(2)
  })
})

describe("Field with a mask", () => {
  it("masks only the field that has a mask", async () => {
    render(
      <form>
        <Field label="Телефон" name="phone" placeholder="" mask={PHONE_MASK} />
        <Field label="Имя" name="firstName" placeholder="" />
      </form>,
    )
    const phone = screen.getByLabelText("Телефон")
    const name = screen.getByLabelText("Имя")

    await userEvent.type(phone, "9991234567")
    await userEvent.type(name, "Иван 123")

    expect(phone).toHaveValue("(999) 123-45-67")
    expect(name).toHaveValue("Иван 123")
    expect(IMask).toHaveBeenCalledTimes(1)
  })
})
