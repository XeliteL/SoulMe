import { Children, isValidElement, ReactNode } from "react"
import classNames from "classnames"

import "./Grid.scss"

interface GridProps {
  columns: 1 | 2 | 4
  children: ReactNode
}

const Grid = ({ columns, children }: GridProps) => {
  const items = Children.toArray(children)

  return (
    <ul
      className={classNames("grid", {
        [`grid--${columns}`]: columns > 1,
      })}
    >
      {items.map((item, index) => (
        <li
          className="grid__item"
          key={isValidElement(item) ? item.key : index}
        >
          {item}
        </li>
      ))}
    </ul>
  )
}

export default Grid
