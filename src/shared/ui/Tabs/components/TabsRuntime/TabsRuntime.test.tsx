import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  type Mock,
  vi,
} from "vitest"

import Tabs from "../../Tabs"
import { TabItem } from "../../types"
import TabsNavigation from "../TabsNavigation"
import TabsRuntime from "./TabsRuntime"

import { act, cleanup, fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

afterEach(() => {
  cleanup()
})

const ITEMS: TabItem[] = [
  { id: "first", title: "First tab", isActive: true, children: <p>first</p> },
  { id: "second", title: "Second tab", children: <p>second</p> },
  { id: "third", title: "Third tab", children: <p>third</p> },
]

function renderTabs() {
  const result = render(
    <>
      <Tabs title="Tabs title" items={ITEMS} />
      <TabsRuntime />
    </>,
  )

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

describe("TabsRuntime", () => {
  it("activates a tab on click", async () => {
    const user = userEvent.setup()
    const { tabs, panels } = renderTabs()

    await user.click(tabs[1])

    expectActive(tabs, panels, 1)
  })

  it("ignores clicks inside the tablist that miss a tab", async () => {
    const user = userEvent.setup()
    const { tabs, panels } = renderTabs()

    await user.click(tabs[1])
    await user.click(screen.getByRole("tablist"))

    expectActive(tabs, panels, 1)
  })

  it.each([
    ["Enter", "{Enter}"],
    ["Space", " "],
  ])("activates a focused tab on %s", async (_, key) => {
    const user = userEvent.setup()
    const { tabs, panels } = renderTabs()

    tabs[1].focus()
    await user.keyboard(key)

    expectActive(tabs, panels, 1)
  })

  it("moves to the next tab on ArrowRight", async () => {
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

  it("jumps to the edge tabs on Home and End", async () => {
    const user = userEvent.setup()
    const { tabs, panels } = renderTabs()

    await user.click(tabs[1])
    await user.keyboard("{End}")

    expectActive(tabs, panels, 2)
    expect(tabs[2]).toHaveFocus()

    await user.keyboard("{Home}")

    expectActive(tabs, panels, 0)
    expect(tabs[0]).toHaveFocus()
  })

  it("prevents default only for handled keys", () => {
    const { tabs, panels } = renderTabs()

    tabs[0].focus()

    expect(fireEvent.keyDown(tabs[0], { key: "a" })).toBe(true)
    expectActive(tabs, panels, 0)

    expect(fireEvent.keyDown(tabs[0], { key: "ArrowRight" })).toBe(false)
    expectActive(tabs, panels, 1)
  })

  it("supports navigation rendered outside via navigationTargetElementId", async () => {
    const user = userEvent.setup()

    render(
      <>
        <TabsNavigation
          id="external-navigation"
          title="Tabs title"
          items={ITEMS}
        />
        <Tabs
          title="Tabs title"
          items={ITEMS}
          navigationTargetElementId="external-navigation"
        />
        <TabsRuntime />
      </>,
    )

    const tabs = screen.getAllByRole("tab")
    const panels = screen.getAllByRole("tabpanel", { hidden: true })

    await user.click(tabs[1])

    expectActive(tabs, panels, 1)
  })

  it("removes listeners when unmounted", async () => {
    const user = userEvent.setup()
    const { tabs, panels, rerender } = renderTabs()

    rerender(
      <>
        <Tabs title="Tabs title" items={ITEMS} />
      </>,
    )
    await user.click(tabs[1])

    expectActive(tabs, panels, 0)
  })
})

describe("TabsRuntime active indicator", () => {
  const NAVIGATION_LEFT = 10
  const NAVIGATION_BORDER = 1

  const getTabRect = (index: number) => ({
    left: NAVIGATION_LEFT + NAVIGATION_BORDER + index * 100,
    width: 80 + index * 10,
  })

  let tabWidthDelta = 0
  let frames: FrameRequestCallback[] = []
  let resizeObservers: { callback: () => void; disconnect: Mock }[] = []

  const flushFrame = () => {
    const callbacks = frames
    frames = []
    act(() => callbacks.forEach((callback) => callback(0)))
  }

  const getIndicatorVars = (navigation: HTMLElement) => ({
    width: navigation.style.getPropertyValue(
      "--tabsNavigationActiveButtonWidth",
    ),
    offsetLeft: navigation.style.getPropertyValue(
      "--tabsNavigationActiveButtonOffsetLeft",
    ),
  })

  beforeEach(() => {
    tabWidthDelta = 0
    frames = []
    resizeObservers = []

    vi.spyOn(Element.prototype, "getBoundingClientRect").mockImplementation(
      function (this: Element) {
        if (this.hasAttribute("data-js-tabs-navigation")) {
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
      return frames.length
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

    expect(getIndicatorVars(screen.getByRole("tablist"))).toEqual({
      width: "80px",
      offsetLeft: "0px",
    })
  })

  it("moves the indicator to the clicked tab", async () => {
    const user = userEvent.setup()
    const { tabs } = renderTabs()

    await user.click(tabs[2])

    expect(getIndicatorVars(screen.getByRole("tablist"))).toEqual({
      width: "100px",
      offsetLeft: "200px",
    })
  })

  it("moves the indicator in navigation rendered via navigationTargetElementId", async () => {
    const user = userEvent.setup()

    render(
      <>
        <TabsNavigation
          id="external-navigation"
          title="Tabs title"
          items={ITEMS}
        />
        <Tabs
          title="Tabs title"
          items={ITEMS}
          navigationTargetElementId="external-navigation"
        />
        <TabsRuntime />
      </>,
    )

    const navigation = screen.getByRole("tablist")

    expect(getIndicatorVars(navigation)).toEqual({
      width: "80px",
      offsetLeft: "0px",
    })

    await user.click(screen.getAllByRole("tab")[1])

    expect(getIndicatorVars(navigation)).toEqual({
      width: "90px",
      offsetLeft: "100px",
    })
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

  it("does not enable the transition after unmount", () => {
    const { rerender } = renderTabs()

    rerender(<Tabs title="Tabs title" items={ITEMS} />)
    flushFrame()
    flushFrame()

    expect(screen.getByRole("tablist")).not.toHaveClass("is-ready")
  })

  it("recalculates the indicator on resize with a single observer", async () => {
    const user = userEvent.setup()
    const { tabs } = renderTabs()

    await user.click(tabs[1])
    await user.click(tabs[0])

    expect(resizeObservers).toHaveLength(1)

    tabWidthDelta = 5
    act(() => resizeObservers[0].callback())

    expect(getIndicatorVars(screen.getByRole("tablist")).width).toBe("85px")
  })

  it("disconnects the resize observer when unmounted", () => {
    const { rerender } = renderTabs()

    rerender(<Tabs title="Tabs title" items={ITEMS} />)

    expect(resizeObservers[0].disconnect).toHaveBeenCalled()
  })
})
