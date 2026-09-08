import { ReactElement, ReactNode } from "react"
import classNames from "classnames"

import "./Section.scss"

interface SectionProps {
  className?: string
  title: string
  titleId: string
  id?: string
  description?: string
  actions?: ReactElement
  isActionsHiddenOnMobile?: boolean
  children?: ReactNode
}

const Section = ({
  className,
  title,
  titleId,
  description,
  actions,
  id,
  isActionsHiddenOnMobile = false,
  children,
}: SectionProps) => {
  return (
    <section
      className={classNames(className, "section container")}
      aria-labelledby={titleId}
      id={id}
    >
      <header className="section__header">
        <div className="section__info">
          <h2 className="section__title h3" id={titleId}>
            {title}
          </h2>
          {description && (
            <div className="section__description">
              <p>{description}</p>
            </div>
          )}
        </div>
        {actions && (
          <div
            className={classNames("section__actions", {
              "hidden-mobile": isActionsHiddenOnMobile,
            })}
          >
            {actions}
          </div>
        )}
      </header>
      <div className="section__body">{children}</div>
    </section>
  )
}

export default Section
