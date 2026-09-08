import classNames from "classnames"

import Button from "@/shared/ui/Button"
import { IconName } from "@/shared/ui/Icon"

import "./Socials.scss"

interface SocialsLink {
  label: string
  href: string
  iconName: IconName
  newTab?: boolean
}

interface SocialsProps {
  className?: string
  links: SocialsLink[]
}

const Socials = ({ className, links }: SocialsProps) => {
  return (
    <ul className={classNames(className, "soc1als")}>
      {links.map((link) => (
        <li className="soc1als__item" key={link.label}>
          <Button
            className="soc1als__link"
            variant="black-10"
            href={link.href}
            target={link.newTab ? "_blank" : undefined}
            label={link.label}
            isLabelHidden
            iconName={link.iconName}
            hasFillIcon
          />
        </li>
      ))}
    </ul>
  )
}

export default Socials
