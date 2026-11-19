import Link from "next/link"

import "./SortMenuList.scss"

interface SortMenuListProps {
  label: string
  items: {
    key: string
    label: string
    href: string
    isCurrent: boolean
  }[]
}

const SortMenuList = ({ label, items }: SortMenuListProps) => {
  return (
    <ul className="sort-menu-list" aria-label={label}>
      {items.map((item) => (
        <li className="sort-menu-list__item" key={item.key}>
          <Link
            className="sort-menu-list__link"
            href={item.href}
            scroll={false}
            aria-current={item.isCurrent ? "true" : undefined}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default SortMenuList
