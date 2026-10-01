import classNames from "classnames"

import TabsNavigation from "./components/TabsNavigation"
import getTabsElementsIds from "./utils/getTabsElementsIds"
import { TabItem, TabsConfig } from "./types"

import "./Tabs.scss"

interface TabsProps {
  className?: string
  title: string
  items: TabItem[]
  navigationTargetElementId?: string
}

const Tabs = ({
  className,
  title,
  items,
  navigationTargetElementId,
}: TabsProps) => {
  return (
    <div
      className={classNames(className, "tabs")}
      data-js-tabs={JSON.stringify({
        navigationTargetElementId,
      } satisfies TabsConfig)}
    >
      {!navigationTargetElementId && (
        <TabsNavigation title={title} items={items} />
      )}
      <div className="tabs__body">
        {items.map((item) => {
          const { id, children, isActive } = item

          const { buttonId, contentId } = getTabsElementsIds(id)

          return (
            <div
              className={classNames("tabs__content", {
                "is-active": isActive,
              })}
              id={contentId}
              role="tabpanel"
              aria-labelledby={buttonId}
              tabIndex={0}
              data-js-content=""
              key={id}
            >
              {children}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Tabs
