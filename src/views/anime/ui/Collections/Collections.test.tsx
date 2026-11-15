import { afterEach, describe, expect, it } from "vitest"

import { collectionGroups } from "./config/collectionGroups"
import Collections from "./Collections"

import { cleanup, render, screen, within } from "@testing-library/react"

afterEach(() => {
  cleanup()
})

const getSection = (name: string) => screen.getByRole("region", { name })

describe("Collections", () => {
  it("ведёт из «Наших жанров» в пустой фильтр", () => {
    render(<Collections />)

    expect(
      within(getSection("Наши жанры")).getByRole("link", {
        name: "Весь каталог",
      }),
    ).toHaveAttribute("href", "/anime/filter")
  })

  it("не показывает ссылку на каталог в остальных коллекциях", () => {
    render(<Collections />)

    const sections = screen
      .getAllByRole("region")
      .filter((section) => section !== getSection("Наши жанры"))

    expect(sections).toHaveLength(collectionGroups.length - 1)

    for (const section of sections) {
      expect(
        within(section).queryByRole("link", { name: "Весь каталог" }),
      ).not.toBeInTheDocument()
    }
  })
})
