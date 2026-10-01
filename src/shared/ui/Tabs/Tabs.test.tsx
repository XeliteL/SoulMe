import { afterEach, describe, expect, it } from "vitest"

import Tabs from "./Tabs"
import { TabItem } from "./types"

import { cleanup, render, screen } from "@testing-library/react"

afterEach(() => {
  cleanup()
})

const ITEMS: TabItem[] = [
  { id: "first", title: "First tab", isActive: true, children: <p>first</p> },
  { id: "second", title: "Second tab", children: <p>second</p> },
]

describe("Tabs", () => {
  it("renders one tab and one tabpanel per item", () => {
    render(<Tabs title="Tabs title" items={ITEMS} />)

    expect(screen.getAllByRole("tab")).toHaveLength(2)
    expect(screen.getAllByRole("tabpanel", { hidden: true })).toHaveLength(2)
  })

  it("links tabs and tabpanels via aria-controls and aria-labelledby", () => {
    render(<Tabs title="Tabs title" items={ITEMS} />)

    const tabs = screen.getAllByRole("tab")
    const panels = screen.getAllByRole("tabpanel", { hidden: true })

    tabs.forEach((tab, index) => {
      const panel = panels[index]

      expect(tab.getAttribute("aria-controls")).toBe(panel.id)
      expect(panel.getAttribute("aria-labelledby")).toBe(tab.id)
    })
  })

  it("marks only the active item as selected and active", () => {
    render(<Tabs title="Tabs title" items={ITEMS} />)

    const [activeTab, inactiveTab] = screen.getAllByRole("tab")
    const [activePanel, inactivePanel] = screen.getAllByRole("tabpanel", {
      hidden: true,
    })

    expect(activeTab.getAttribute("aria-selected")).toBe("true")
    expect(activeTab.tabIndex).toBe(0)
    expect(inactiveTab.getAttribute("aria-selected")).toBe("false")
    expect(inactiveTab.tabIndex).toBe(-1)

    expect(activePanel.classList.contains("is-active")).toBe(true)
    expect(inactivePanel.classList.contains("is-active")).toBe(false)
  })

  it("labels the tablist with the title", () => {
    render(<Tabs title="Tabs title" items={ITEMS} />)

    expect(screen.getByRole("tablist")).toHaveAccessibleName("Tabs title")
  })

  it("renders tabs as non-submitting buttons", () => {
    render(<Tabs title="Tabs title" items={ITEMS} />)

    screen.getAllByRole("tab").forEach((tab) => {
      expect(tab.tagName).toBe("BUTTON")
      expect(tab).toHaveAttribute("type", "button")
    })
  })

  it("skips navigation when navigationTargetElementId is set", () => {
    render(
      <Tabs
        title="Tabs title"
        items={ITEMS}
        navigationTargetElementId="external-navigation"
      />,
    )

    expect(screen.queryByRole("tablist")).toBeNull()
    expect(screen.getAllByRole("tabpanel", { hidden: true })).toHaveLength(2)
  })
})
