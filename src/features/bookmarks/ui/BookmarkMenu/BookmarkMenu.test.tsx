import { afterEach, describe, expect, it } from "vitest"

import BookmarkMenu from "./BookmarkMenu"

import { cleanup, render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

afterEach(() => {
  cleanup()
})

const renderMenu = () => {
  const { container } = render(<BookmarkMenu animeId="berserk" />)
  const toggle = screen.getByRole("button", { name: "Выбрать папку" })

  return {
    user: userEvent.setup(),
    toggle,
    getMain: () =>
      container.querySelector<HTMLButtonElement>(".bookmark-menu__main")!,
    panel: () =>
      within(document.getElementById(toggle.getAttribute("aria-controls")!)!),
  }
}

describe("BookmarkMenu", () => {
  it("основная кнопка добавляет в закладки без маркера", async () => {
    const { user, toggle, getMain } = renderMenu()

    expect(getMain()).toHaveTextContent("Добавить в закладки")

    await user.click(getMain())

    expect(getMain()).toHaveTextContent("В закладках")
    expect(toggle).toHaveAttribute("aria-expanded", "false")
  })

  it("выбор маркера меняет кнопку, закрывает панель и отмечает пункт", async () => {
    const { user, toggle, getMain, panel } = renderMenu()

    await user.click(toggle)
    expect(toggle).toHaveAttribute("aria-expanded", "true")

    await user.click(panel().getByRole("button", { name: "Любимые" }))

    expect(getMain()).toHaveTextContent("Любимые")
    expect(toggle).toHaveAttribute("aria-expanded", "false")

    await user.click(toggle)
    expect(panel().getByRole("button", { name: "Любимые" })).toHaveAttribute(
      "aria-current",
      "true",
    )
  })

  it("удаляет из закладок", async () => {
    const { user, toggle, getMain, panel } = renderMenu()

    expect(
      panel().queryByRole("button", { name: "Удалить из закладок" }),
    ).not.toBeInTheDocument()

    await user.click(getMain())
    await user.click(toggle)
    await user.click(
      panel().getByRole("button", { name: "Удалить из закладок" }),
    )

    expect(getMain()).toHaveTextContent("Добавить в закладки")
  })

  it("Esc закрывает панель и возвращает фокус на шеврон", async () => {
    const { user, toggle, panel } = renderMenu()

    await user.click(toggle)
    panel().getByRole("button", { name: "Смотрю" }).focus()
    await user.keyboard("{Escape}")

    expect(toggle).toHaveAttribute("aria-expanded", "false")
    expect(toggle).toHaveFocus()
  })
})
