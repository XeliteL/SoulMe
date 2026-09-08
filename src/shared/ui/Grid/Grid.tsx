import { Children, ReactNode } from "react"
import classNames from "classnames"

import "./Grid.scss"

interface GridProps {
  columns: number
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
        <li className="grid__item" key={index}>
          {item}
        </li>
      ))}
    </ul>
  )
}

export default Grid
