import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  type Mock,
  vi,
} from "vitest"

import { TabItem } from "./types"
import Tabs, { TabsNavigation, TabsPanel, TabsRoot } from "."

import { act, cleanup, fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

const ITEMS: TabItem[] = [
  { id: "first", title: "First tab", isActive: true, children: <p>first</p> },
  { id: "second", title: "Second tab", children: <p>second</p> },
  { id: "third", title: "Third tab", children: <p>third</p> },
]

function renderTabs(items = ITEMS) {
  const result = render(<Tabs title="Tabs title" items={items} />)

  return {
    ...result,
    tabs: screen.getAllByRole("tab"),
    panels: screen.getAllByRole("tabpanel", { hidden: true }),
  }
}

function expectActive(
  tabs: HTMLElement[],
  panels: HTMLElement[],
  activeIndex: number,
) {
  tabs.forEach((tab, index) => {
    const isActive = index === activeIndex

    expect(tab).toHaveAttribute("aria-selected", String(isActive))
    expect(tab.tabIndex).toBe(isActive ? 0 : -1)
    expect(tab.classList.contains("is-active")).toBe(isActive)
    expect(panels[index].classList.contains("is-active")).toBe(isActive)
  })
}

afterEach(() => {
  cleanup()
})

describe("Tabs", () => {
  it("renders one tab and one tabpanel per item", () => {
    const { tabs, panels } = renderTabs()

    expect(tabs).toHaveLength(3)
    expect(panels).toHaveLength(3)
  })

  it("links tabs and tabpanels via aria-controls and aria-labelledby", () => {
    const { tabs, panels } = renderTabs()

    tabs.forEach((tab, index) => {
      expect(tab).toHaveAttribute("aria-controls", panels[index].id)
      expect(panels[index]).toHaveAttribute("aria-labelledby", tab.id)
    })
  })

  it("labels the tablist with the title", () => {
    renderTabs()

    expect(screen.getByRole("tablist")).toHaveAccessibleName("Tabs title")
  })

  it("renders tabs as non-submitting buttons", () => {
    const { tabs } = renderTabs()

    tabs.forEach((tab) => {
      expect(tab.tagName).toBe("BUTTON")
      expect(tab).toHaveAttribute("type", "button")
    })
  })

  it("passes className to the tabs wrapper", () => {
    const { container } = render(
      <Tabs className="genres" title="Tabs title" items={ITEMS} />,
    )

    expect(container.firstElementChild).toHaveClass("genres", "tabs")
  })

  it("starts with the item marked as active", () => {
    const { tabs, panels } = renderTabs()

    expectActive(tabs, panels, 0)
  })

  it("falls back to the first item when none is marked as active", () => {
    const { tabs, panels } = renderTabs(
      ITEMS.map((item) => ({ ...item, isActive: false })),
    )

    expectActive(tabs, panels, 0)
  })

  it("activates a tab on click", async () => {
    const user = userEvent.setup()
    const { tabs, panels } = renderTabs()

    await user.click(tabs[1])

    expectActive(tabs, panels, 1)
  })

  it("moves to the next tab on ArrowRight and focuses it", async () => {
    const user = userEvent.setup()
    const { tabs, panels } = renderTabs()

    tabs[0].focus()
    await user.keyboard("{ArrowRight}")

    expectActive(tabs, panels, 1)
    expect(tabs[1]).toHaveFocus()
  })

  it("wraps from the last tab to the first on ArrowRight", async () => {
    const user = userEvent.setup()
    const { tabs, panels } = renderTabs()

    await user.click(tabs[2])
    await user.keyboard("{ArrowRight}")

    expectActive(tabs, panels, 0)
    expect(tabs[0]).toHaveFocus()
  })

  it("wraps from the first tab to the last on ArrowLeft", async () => {
    const user = userEvent.setup()
    const { tabs, panels } = renderTabs()

    tabs[0].focus()
    await user.keyboard("{ArrowLeft}")

    expectActive(tabs, panels, 2)
    expect(tabs[2]).toHaveFocus()
  })

  it("treats ArrowDown and ArrowUp like ArrowRight and ArrowLeft", async () => {
    const user = userEvent.setup()
    const { tabs, panels } = renderTabs()

    tabs[0].focus()
    await user.keyboard("{ArrowDown}")
    expectActive(tabs, panels, 1)

    await user.keyboard("{ArrowUp}")
    expectActive(tabs, panels, 0)
  })

  it("jumps to the edge tabs on Home and End", async () => {
    const user = userEvent.setup()
    const { tabs, panels } = renderTabs()

    tabs[0].focus()
    await user.keyboard("{End}")
    expectActive(tabs, panels, 2)
    expect(tabs[2]).toHaveFocus()

    await user.keyboard("{Home}")
    expectActive(tabs, panels, 0)
    expect(tabs[0]).toHaveFocus()
  })

  it("prevents default only for handled keys", () => {
    const { tabs } = renderTabs()

    expect(fireEvent.keyDown(tabs[0], { key: "ArrowRight" })).toBe(false)
    expect(fireEvent.keyDown(tabs[1], { key: "Tab" })).toBe(true)
  })
})

describe("Tabs composed from parts", () => {
  it("shares state between navigation and panels rendered apart", async () => {
    const user = userEvent.setup()

    render(
      <TabsRoot items={ITEMS}>
        <header>
          <TabsNavigation title="Tabs title" />
        </header>
        <main>
          {ITEMS.map(({ id, children }) => (
            <TabsPanel id={id} key={id}>
              {children}
            </TabsPanel>
          ))}
        </main>
      </TabsRoot>,
    )

    const tabs = screen.getAllByRole("tab")
    const panels = screen.getAllByRole("tabpanel", { hidden: true })

    await user.click(tabs[2])

    expectActive(tabs, panels, 2)
  })

  it("throws when a part is rendered outside TabsRoot", () => {
    vi.spyOn(console, "error").mockImplementation(() => {})

    expect(() => render(<TabsPanel id="first" />)).toThrow(
      "Tabs part must be rendered inside TabsRoot",
    )

    vi.restoreAllMocks()
  })
})

describe("Tabs active indicator", () => {
  const NAVIGATION_LEFT = 10
  const NAVIGATION_BORDER = 1

  const getTabRect = (index: number) => ({
    left: NAVIGATION_LEFT + NAVIGATION_BORDER + index * 100,
    width: 80 + index * 10,
  })

  let tabWidthDelta = 0
  let frames: FrameRequestCallback[] = []
  let lastFrameId = 0
  let resizeObservers: { callback: () => void; disconnect: Mock }[] = []

  const flushFrame = () => {
    const callbacks = frames
    frames = []
    act(() => callbacks.forEach((callback) => callback(0)))
  }

  const getIndicatorVars = () => {
    const navigation = screen.getByRole("tablist")

    return {
      width: navigation.style.getPropertyValue(
        "--tabsNavigationActiveButtonWidth",
      ),
      offsetLeft: navigation.style.getPropertyValue(
        "--tabsNavigationActiveButtonOffsetLeft",
      ),
    }
  }

  beforeEach(() => {
    tabWidthDelta = 0
    frames = []
    lastFrameId = 0
    resizeObservers = []

    vi.spyOn(Element.prototype, "getBoundingClientRect").mockImplementation(
      function (this: Element) {
        if (this.getAttribute("role") === "tablist") {
          return { left: NAVIGATION_LEFT, width: 500 } as DOMRect
        }

        const index = ITEMS.findIndex((item) => `${item.id}-tab` === this.id)
        if (index === -1) return { left: 0, width: 0 } as DOMRect

        const { left, width } = getTabRect(index)
        return { left, width: width + tabWidthDelta } as DOMRect
      },
    )
    vi.spyOn(Element.prototype, "clientLeft", "get").mockReturnValue(
      NAVIGATION_BORDER,
    )
    vi.spyOn(window, "requestAnimationFrame").mockImplementation((callback) => {
      frames.push(callback)
      return ++lastFrameId
    })
    vi.stubGlobal(
      "ResizeObserver",
      class {
        disconnect = vi.fn()

        constructor(callback: () => void) {
          resizeObservers.push({ callback, disconnect: this.disconnect })
        }

        observe() {}
      },
    )
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  it("positions the indicator under the initially active tab on mount", () => {
    renderTabs()

    expect(getIndicatorVars()).toEqual({ width: "80px", offsetLeft: "0px" })
  })

  it("moves the indicator to the clicked tab", async () => {
    const user = userEvent.setup()
    const { tabs } = renderTabs()

    await user.click(tabs[2])

    expect(getIndicatorVars()).toEqual({ width: "100px", offsetLeft: "200px" })
  })

  it("enables the indicator transition only after two frames", () => {
    renderTabs()
    const navigation = screen.getByRole("tablist")

    expect(navigation).not.toHaveClass("is-ready")

    flushFrame()
    expect(navigation).not.toHaveClass("is-ready")

    flushFrame()
    expect(navigation).toHaveClass("is-ready")
  })

  it("cancels pending frames on unmount", () => {
    const cancelAnimationFrame = vi.spyOn(window, "cancelAnimationFrame")
    const { unmount } = renderTabs()

    flushFrame()
    unmount()

    expect(cancelAnimationFrame).toHaveBeenCalledWith(1)
    expect(cancelAnimationFrame).toHaveBeenCalledWith(2)
  })

  it("recalculates the indicator on resize with a single observer", async () => {
    const user = userEvent.setup()
    const { tabs } = renderTabs()

    await user.click(tabs[1])
    await user.click(tabs[0])

    expect(resizeObservers).toHaveLength(1)

    tabWidthDelta = 5
    act(() => resizeObservers[0].callback())

    expect(getIndicatorVars().width).toBe("85px")
  })

  it("disconnects the resize observer when unmounted", () => {
    const { unmount } = renderTabs()

    unmount()

    expect(resizeObservers[0].disconnect).toHaveBeenCalled()
  })
})
