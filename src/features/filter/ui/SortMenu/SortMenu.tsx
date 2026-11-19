import Dropdown from "@/shared/ui/Dropdown"

import {
  DEFAULT_SORT,
  orderLabels,
  sortKeys,
  sortOptions,
  sortOrders,
} from "../../config/sortOptions"
import { buildFilterHref } from "../../lib/buildFilterHref"
import type { Filter } from "../../model/filterSchema"
import SortMenuList from "./components/SortMenuList"

interface SortMenuProps {
  filter: Filter
}

const SortMenu = ({ filter }: SortMenuProps) => {
  const sort = filter.sort ?? DEFAULT_SORT
  const order = filter.order ?? sortOptions[sort].order

  const sortItems = sortKeys.map((key) => ({
    key,
    label: sortOptions[key].label,
    href: buildFilterHref({ ...filter, sort: key, order: undefined }),
    isCurrent: key === sort,
  }))
  const orderItems = sortOrders.map((key) => ({
    key,
    label: orderLabels[key],
    href: buildFilterHref({ ...filter, order: key }),
    isCurrent: key === order,
  }))

  return (
    <Dropdown
      className="sort-menu"
      label={sortOptions[sort].label}
      iconName="list-sort"
      hasFillIcon
    >
      <nav className="sort-menu__navigation" aria-label="Сортировка">
        <SortMenuList label="Сортировать по" items={sortItems} />
        <SortMenuList label="Направление" items={orderItems} />
      </nav>
    </Dropdown>
  )
}

export default SortMenu
