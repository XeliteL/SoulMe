import { Children, ReactNode } from "react"
import classNames from "classnames"

import "./AccordionGroup.scss"

interface AccordionGroupProps {
  columns?: number
  children?: ReactNode
  isOrderedList?: boolean
}

const AccordionGroup = ({
  columns = 1,
  children,
  isOrderedList = true,
}: AccordionGroupProps) => {
  const items = Children.toArray(children)
  const ListTag = isOrderedList ? "ol" : "ul"

  const className = classNames("accordion-group", {
    [`accordion-group--${columns}-columns`]: columns > 1,
    "accordion-group--has-counter": isOrderedList,
  })

  const renderItem = (item: ReactNode, key: number) => (
    <li className="accordion-group__item" key={key}>
      {item}
    </li>
  )

  if (columns <= 1) {
    return (
      <ListTag className={className} role="list">
        {items.map((item, index) => renderItem(item, index))}
      </ListTag>
    )
  }

  const itemsPerColumn = Math.ceil(items.length / columns)
  const columnGroups = Array.from({ length: columns }, (_, column) =>
    items.slice(column * itemsPerColumn, (column + 1) * itemsPerColumn),
  )

  return (
    <ListTag className={className} role="list">
      {columnGroups.map((columnItems, column) => (
        <li className="accordion-group__column" key={column}>
          <ul className="accordion-group__column-list" role="list">
            {columnItems.map((item, index) =>
              renderItem(item, column * itemsPerColumn + index),
            )}
          </ul>
        </li>
      ))}
    </ListTag>
  )
}

export default AccordionGroup
