import classNames from "classnames"

import TabsNavigation from "./components/TabsNavigation"
import TabsPanel from "./components/TabsPanel"
import TabsRoot from "./components/TabsRoot"
import { TabItem } from "./types"

import "./Tabs.scss"

interface TabsProps {
  className?: string
  title: string
  items: TabItem[]
}

const Tabs = ({ className, title, items }: TabsProps) => {
  return (
    <TabsRoot items={items}>
      <div className={classNames(className, "tabs")}>
        <TabsNavigation title={title} />
        <div className="tabs__body">
          {items.map(({ id, children }) => {
            return (
              <TabsPanel id={id} key={id}>
                {children}
              </TabsPanel>
            )
          })}
        </div>
      </div>
    </TabsRoot>
  )
}

export default Tabs
