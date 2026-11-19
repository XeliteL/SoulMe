import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import { buildFilterHref } from "../../lib/buildFilterHref"
import type { Filter } from "../../model/filterSchema"
import SearchField from "./SearchField"

import { act, cleanup, fireEvent, render, screen } from "@testing-library/react"

const { replace } = vi.hoisted(() => ({ replace: vi.fn() }))

vi.mock("next/navigation", () => ({ useRouter: () => ({ replace }) }))

const getInput = () => screen.getByRole("searchbox")

const type = (value: string) =>
  fireEvent.change(getInput(), { target: { value } })

const waitDelay = () => act(() => vi.advanceTimersByTime(300))

beforeEach(() => {
  vi.useFakeTimers()
})

afterEach(() => {
  cleanup()
  replace.mockReset()
  vi.useRealTimers()
})

describe("SearchField", () => {
  it("переходит один раз после паузы и сохраняет остальные параметры", () => {
    const filter: Filter = { genre: ["action"], sort: "title" }
    render(<SearchField filter={filter} />)

    type("ат")
    type("атака")
    expect(replace).not.toHaveBeenCalled()

    waitDelay()

    expect(replace).toHaveBeenCalledTimes(1)
    expect(replace).toHaveBeenCalledWith(
      buildFilterHref({ ...filter, search: "атака" }),
      { scroll: false },
    )
  })

  it("не затирает ввод ответом на свой же запрос", () => {
    const { rerender } = render(<SearchField filter={{}} />)

    type("ab")
    waitDelay()
    rerender(<SearchField filter={{}} />)
    expect(getInput()).toHaveValue("ab")

    type("abc")
    rerender(<SearchField filter={{ search: "ab" }} />)
    expect(getInput()).toHaveValue("abc")
  })

  it("подхватывает поиск, сброшенный снаружи", () => {
    const { rerender } = render(<SearchField filter={{ search: "abc" }} />)

    rerender(<SearchField filter={{}} />)

    expect(getInput()).toHaveValue("")
  })

  it("крестик сразу сбрасывает поиск и возвращает фокус в поле", () => {
    render(<SearchField filter={{ genre: ["action"], search: "abc" }} />)

    fireEvent.click(screen.getByRole("button", { name: "Очистить поиск" }))

    expect(replace).toHaveBeenCalledWith(
      buildFilterHref({ genre: ["action"] }),
      {
        scroll: false,
      },
    )
    expect(getInput()).toHaveValue("")
    expect(getInput()).toHaveFocus()
    expect(
      screen.queryByRole("button", { name: "Очистить поиск" }),
    ).not.toBeInTheDocument()
  })
})
