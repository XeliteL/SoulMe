import { afterEach, describe, expect, it } from "vitest"

import BookmarkMenu from "./BookmarkMenu"

import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react"
import userEvent from "@testing-library/user-event"

afterEach(() => {
  cleanup()
})

const renderMenu = ({ withBoundary = false } = {}) => {
  const menu = <BookmarkMenu animeId="berserk" />
  const { container } = render(
    withBoundary ? <div data-dropdown-boundary>{menu}</div> : menu,
  )
  const toggle = screen.getByRole("button", { name: "Выбрать папку" })

  return {
    user: userEvent.setup(),
    toggle,
    boundary: container.firstElementChild!,
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
    expect(panel().getByRole("button", { name: /^Любимые/ })).toHaveAttribute(
      "aria-current",
      "true",
    )
  })

  it("повторный клик по текущему маркеру удаляет из закладок", async () => {
    const { user, toggle, getMain, panel } = renderMenu()

    await user.click(getMain())
    await user.click(toggle)
    await user.click(panel().getByRole("button", { name: /^В закладках/ }))

    expect(getMain()).toHaveTextContent("Добавить в закладки")
  })

  it("клик по другому маркеру переключает его, а не удаляет", async () => {
    const { user, toggle, getMain, panel } = renderMenu()

    await user.click(getMain())
    await user.click(toggle)
    await user.click(panel().getByRole("button", { name: "Смотрю" }))

    expect(getMain()).toHaveTextContent("Смотрю")
  })

  it("только текущий маркер сообщает, что клик уберёт из закладок", async () => {
    const { user, toggle, getMain, panel } = renderMenu()

    await user.click(getMain())
    await user.click(toggle)

    expect(
      panel().getByRole("button", { name: "В закладках, убрать из закладок" }),
    ).toHaveAttribute("aria-current", "true")
    expect(panel().getByRole("button", { name: "Смотрю" })).not.toHaveAttribute(
      "aria-current",
    )
  })

  it("Esc закрывает панель и возвращает фокус на шеврон", async () => {
    const { user, toggle, panel } = renderMenu()

    await user.click(toggle)
    panel().getByRole("button", { name: "Смотрю" }).focus()
    await user.keyboard("{Escape}")

    expect(toggle).toHaveAttribute("aria-expanded", "false")
    expect(toggle).toHaveFocus()
  })

  describe("уход мыши за границу", () => {
    it("закрывает панель при уходе мыши", async () => {
      const { user, toggle, boundary } = renderMenu({ withBoundary: true })

      await user.click(toggle)
      fireEvent.pointerLeave(boundary, { pointerType: "mouse" })

      expect(toggle).toHaveAttribute("aria-expanded", "false")
    })

    it("не закрывает панель при уходе касания", async () => {
      const { user, toggle, boundary } = renderMenu({ withBoundary: true })

      await user.click(toggle)
      fireEvent.pointerLeave(boundary, { pointerType: "touch" })

      expect(toggle).toHaveAttribute("aria-expanded", "true")
    })

    it("без границы уход мыши панель не закрывает", async () => {
      const { user, toggle, boundary } = renderMenu()

      await user.click(toggle)
      fireEvent.pointerLeave(boundary, { pointerType: "mouse" })

      expect(toggle).toHaveAttribute("aria-expanded", "true")
    })
  })
})
