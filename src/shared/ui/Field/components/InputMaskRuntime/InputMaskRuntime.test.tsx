import IMask from "imask"
import { afterEach, describe, expect, it, vi } from "vitest"

import Field from "../../Field"
import InputMaskRuntime from "./InputMaskRuntime"

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

function renderForm(runtimeCount = 1) {
  const result = render(
    <form>
      <Field label="Телефон" placeholder="" mask={PHONE_MASK} />
      <Field label="Имя" placeholder="" />
      {Array.from({ length: runtimeCount }, (_, index) => (
        <InputMaskRuntime key={index} />
      ))}
    </form>,
  )

  return {
    ...result,
    phone: screen.getByLabelText<HTMLInputElement>("Телефон"),
    name: screen.getByLabelText<HTMLInputElement>("Имя"),
  }
}

describe("InputMaskRuntime", () => {
  it("formats typed digits by the mask from data-js-input-mask", async () => {
    const { phone } = renderForm()

    await userEvent.type(phone, "9991234567")

    expect(phone).toHaveValue("(999) 123-45-67")
  })

  it("rejects characters the mask does not accept", async () => {
    const { phone } = renderForm()

    await userEvent.type(phone, "9a9b9")

    expect(phone).toHaveValue("(999")
  })

  it("does not touch fields without a mask", async () => {
    const { name } = renderForm()

    await userEvent.type(name, "Иван 123")

    expect(name).toHaveValue("Иван 123")
    expect(IMask).toHaveBeenCalledTimes(1)
  })

  it("initializes each field once even with several runtimes on the page", async () => {
    const { phone } = renderForm(2)

    expect(IMask).toHaveBeenCalledTimes(1)

    await userEvent.type(phone, "9991234567")

    expect(phone).toHaveValue("(999) 123-45-67")
  })

  it("removes the mask on unmount", () => {
    const { phone, unmount } = renderForm()

    unmount()

    expect(phone.dataset.maskInitialized).toBeUndefined()
  })

  it("applies the mask again after remount", async () => {
    const { unmount } = renderForm()

    unmount()

    const { phone } = renderForm()

    await userEvent.type(phone, "9991234567")

    expect(phone).toHaveValue("(999) 123-45-67")
    expect(IMask).toHaveBeenCalledTimes(2)
  })
})
