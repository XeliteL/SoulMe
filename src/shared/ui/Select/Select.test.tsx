import { afterEach, describe, expect, it } from "vitest"

import Select, { type SelectOption } from "./Select"

import { cleanup, render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

const OPTIONS: SelectOption[] = [
  { value: "+7" },
  { value: "+1", isSelected: true },
  { value: "+44" },
]

afterEach(() => {
  cleanup()
})

function renderSelect(options = OPTIONS) {
  render(
    <>
      <form data-testid="form">
        <Select id="code" name="phoneCode" label="Код" options={options} />
      </form>
      <button type="button">Снаружи</button>
    </>,
  )

  const [nativeSelect, combobox] = screen.getAllByRole("combobox", {
    name: "Код",
  }) as [HTMLSelectElement, HTMLElement]

  return {
    nativeSelect,
    combobox,
    form: screen.getByTestId<HTMLFormElement>("form"),
    getOption: (value: string) =>
      within(screen.getByRole("listbox", { hidden: true })).getByText(value),
  }
}

describe("Select", () => {
  describe("initial value", () => {
    it("selects the option marked isSelected", () => {
      const { nativeSelect, combobox, getOption } = renderSelect()

      expect(nativeSelect.tagName).toBe("SELECT")
      expect(nativeSelect).toHaveValue("+1")
      expect(combobox).toHaveTextContent("+1")
      expect(getOption("+1")).toHaveAttribute("aria-selected", "true")
      expect(getOption("+7")).toHaveAttribute("aria-selected", "false")
    })

    it("falls back to the first option", () => {
      const { nativeSelect, combobox, getOption } = renderSelect([
        { value: "+7" },
        { value: "+1" },
      ])

      expect(nativeSelect).toHaveValue("+7")
      expect(combobox).toHaveTextContent("+7")
      expect(getOption("+7")).toHaveAttribute("aria-selected", "true")
    })
  })

  describe("mouse", () => {
    it("opens on click and points to the selected option", async () => {
      const { combobox, getOption } = renderSelect()

      expect(combobox).toHaveAttribute("aria-expanded", "false")

      await userEvent.click(combobox)

      expect(combobox).toHaveAttribute("aria-expanded", "true")
      expect(combobox).toHaveAttribute(
        "aria-activedescendant",
        getOption("+1").id,
      )
    })

    it("selects a clicked option, closes and returns focus", async () => {
      const { nativeSelect, combobox, getOption } = renderSelect()

      await userEvent.click(combobox)
      await userEvent.click(getOption("+44"))

      expect(combobox).toHaveAttribute("aria-expanded", "false")
      expect(combobox).toHaveTextContent("+44")
      expect(nativeSelect).toHaveValue("+44")
      expect(getOption("+44")).toHaveAttribute("aria-selected", "true")
      expect(combobox).toHaveFocus()
    })

    it("closes on click outside without changing the value", async () => {
      const { combobox } = renderSelect()

      await userEvent.click(combobox)
      await userEvent.click(screen.getByRole("button", { name: "Снаружи" }))

      expect(combobox).toHaveAttribute("aria-expanded", "false")
      expect(combobox).toHaveTextContent("+1")
    })
  })

  describe("keyboard", () => {
    it("opens on ArrowDown and selects the next option on Enter", async () => {
      const { combobox } = renderSelect()

      combobox.focus()
      await userEvent.keyboard("{ArrowDown}")

      expect(combobox).toHaveAttribute("aria-expanded", "true")

      await userEvent.keyboard("{ArrowDown}{Enter}")

      expect(combobox).toHaveAttribute("aria-expanded", "false")
      expect(combobox).toHaveTextContent("+44")
    })

    it("does not move above the first option", async () => {
      const { combobox } = renderSelect()

      combobox.focus()
      await userEvent.keyboard("{Enter}{Home}{ArrowUp}{ArrowUp}{Enter}")

      expect(combobox).toHaveTextContent("+7")
    })

    it("does not move below the last option", async () => {
      const { combobox } = renderSelect()

      combobox.focus()
      await userEvent.keyboard("{Enter}{ArrowDown}{ArrowDown}{ArrowDown}")
      await userEvent.keyboard("{Enter}")

      expect(combobox).toHaveTextContent("+44")
    })

    it("highlights the last option on End", async () => {
      const { combobox, getOption } = renderSelect()

      combobox.focus()
      await userEvent.keyboard("{Enter}{End}")

      expect(combobox).toHaveAttribute(
        "aria-activedescendant",
        getOption("+44").id,
      )
    })

    it("closes on Escape without selecting", async () => {
      const { combobox } = renderSelect()

      combobox.focus()
      await userEvent.keyboard("{Enter}{ArrowDown}{Escape}")

      expect(combobox).toHaveAttribute("aria-expanded", "false")
      expect(combobox).toHaveTextContent("+1")
    })
  })

  describe("native select", () => {
    it("updates the custom button when changed", async () => {
      const { nativeSelect, combobox } = renderSelect()

      await userEvent.selectOptions(nativeSelect, "+44")

      expect(combobox).toHaveTextContent("+44")
    })

    it("submits the selected value under its name", async () => {
      const { combobox, form, getOption } = renderSelect()

      expect(new FormData(form).get("phoneCode")).toBe("+1")

      await userEvent.click(combobox)
      await userEvent.click(getOption("+7"))

      expect(new FormData(form).get("phoneCode")).toBe("+7")
    })
  })
})
