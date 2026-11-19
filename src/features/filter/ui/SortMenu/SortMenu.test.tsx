import { afterEach, describe, expect, it } from "vitest"

import { parseFilter } from "../../model/filterSchema"
import SortMenu from "./SortMenu"

import { cleanup, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

const renderOpenMenu = async (params: Record<string, unknown>) => {
  render(<SortMenu filter={parseFilter(params)} />)
  await userEvent.setup().click(screen.getByRole("button"))
}

const getLink = (name: string) => screen.getByRole("link", { name })

afterEach(() => {
  cleanup()
})

describe("SortMenu", () => {
  it("marks the default sort and order", async () => {
    await renderOpenMenu({})

    expect(screen.getByRole("button")).toHaveTextContent("По популярности")
    expect(getLink("По популярности")).toHaveAttribute("aria-current", "true")
    expect(getLink("По убыванию")).toHaveAttribute("aria-current", "true")
  })

  it("resets the order and keeps other params in sort links", async () => {
    await renderOpenMenu({ genre: "action", sort: "title", order: "desc" })

    expect(getLink("По рейтингу")).toHaveAttribute(
      "href",
      "/anime/filter?genre=action&sort=rating",
    )
    expect(getLink("По популярности")).toHaveAttribute(
      "href",
      "/anime/filter?genre=action",
    )
  })

  it("keeps the sort in order links and uses its default order", async () => {
    await renderOpenMenu({ sort: "title" })

    expect(getLink("По возрастанию")).toHaveAttribute("aria-current", "true")
    expect(getLink("По возрастанию")).toHaveAttribute(
      "href",
      "/anime/filter?sort=title",
    )
    expect(getLink("По убыванию")).toHaveAttribute(
      "href",
      "/anime/filter?sort=title&order=desc",
    )
  })
})
