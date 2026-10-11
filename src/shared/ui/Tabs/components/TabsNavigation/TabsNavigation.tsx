import classNames from "classnames"

import { TabItem } from "../../types"
import getTabsElementsIds from "../../utils/getTabsElementsIds"

import "./TabsNavigation.scss"

interface TabsNavigationProps {
  className?: string
  id?: string
  title: string
  items: TabItem[]
}

const TabsNavigation = ({
  className,
  id,
  title,
  items,
}: TabsNavigationProps) => {
  return (
    <div
      className={classNames(className, "tabs-navigation")}
      id={id}
      role="tablist"
      aria-label={title}
      data-js-tabs-navigation=""
    >
      {items.map((item) => {
        const { buttonId, contentId } = getTabsElementsIds(item.id)

        return (
          <button
            className={classNames("tabs-navigation__button", {
              "is-active": item.isActive,
            })}
            id={buttonId}
            aria-controls={contentId}
            role="tab"
            type="button"
            aria-selected={!!item.isActive}
            tabIndex={item.isActive ? 0 : -1}
            data-js-tabs-button=""
            key={item.id}
          >
            {item.title}
          </button>
        )
      })}
    </div>
  )
}

export default TabsNavigation
