import { afterEach, describe, expect, it } from "vitest"
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import MenuToggle from "./MenuToggle"

const DIALOG_ID = "test-menu"

function renderMenuToggle() {
  document.body.insertAdjacentHTML(
    "beforeend",
    `<dialog id="${DIALOG_ID}"></dialog>`,
  )
  const dialog = document.getElementById(DIALOG_ID) as HTMLDialogElement

  render(<MenuToggle dialogId={DIALOG_ID} />)

  return { dialog, button: screen.getByRole("button") }
}

afterEach(() => {
  cleanup()
  document.documentElement.classList.remove("is-lock")
})

describe("MenuToggle", () => {
  it("renders closed by default", () => {
    const { dialog, button } = renderMenuToggle()

    expect(button).toHaveAccessibleName("Open menu")
    expect(button).toHaveAttribute("aria-expanded", "false")
    expect(dialog.open).toBe(false)
    expect(document.documentElement).not.toHaveClass("is-lock")
  })

  it("opens the dialog and locks scroll on click", async () => {
    const user = userEvent.setup()
    const { dialog, button } = renderMenuToggle()

    await user.click(button)

    expect(dialog.open).toBe(true)
    expect(button).toHaveAccessibleName("Close menu")
    expect(button).toHaveAttribute("aria-expanded", "true")
    expect(document.documentElement).toHaveClass("is-lock")
  })

  it("keeps the dialog open until the closing transition finishes", async () => {
    const user = userEvent.setup()
    const { dialog, button } = renderMenuToggle()

    await user.click(button)
    await user.click(button)

    expect(document.documentElement).not.toHaveClass("is-lock")
    expect(dialog.open).toBe(true)
    expect(dialog).toHaveClass("is-closing")

    fireEvent.transitionEnd(dialog)

    expect(dialog.open).toBe(false)
    expect(dialog).not.toHaveClass("is-closing")
  })

  it("requests close on Escape and waits for the exit transition", async () => {
    const user = userEvent.setup()
    const { dialog, button } = renderMenuToggle()

    await user.click(button)
    expect(dialog.open).toBe(true)

    await user.keyboard("{Escape}")

    expect(dialog.open).toBe(true)
    expect(dialog).toHaveClass("is-closing")

    fireEvent.transitionEnd(dialog)

    expect(dialog.open).toBe(false)
    expect(button).toHaveAttribute("aria-expanded", "false")
  })

  it("syncs state when the dialog fires a native close event", async () => {
    const user = userEvent.setup()
    const { dialog, button } = renderMenuToggle()

    await user.click(button)
    expect(button).toHaveAttribute("aria-expanded", "true")

    act(() => {
      dialog.close()
    })

    expect(button).toHaveAttribute("aria-expanded", "false")
    expect(document.documentElement).not.toHaveClass("is-lock")
  })
})
