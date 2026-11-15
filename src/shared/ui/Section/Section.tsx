import { ReactElement, ReactNode } from "react"
import classNames from "classnames"

import { useBaseId } from "@/shared/lib/useBaseId"

import "./Section.scss"

interface SectionProps {
  className?: string
  title?: string
  titleAs?: "h1" | "h2"
  id?: string
  ariaLabelledby?: string
  description?: string
  actions?: ReactElement
  isActionsHiddenOnMobile?: boolean
  children?: ReactNode
}

const Section = ({
  className,
  title,
  titleAs = "h2",
  description,
  actions,
  id,
  ariaLabelledby,
  isActionsHiddenOnMobile = false,
  children,
}: SectionProps) => {
  const headingId = useBaseId()
  const TitleTag = titleAs

  return (
    <section
      className={classNames(className, "section container")}
      aria-labelledby={ariaLabelledby ?? (title ? headingId : undefined)}
      id={id}
    >
      {(title || description || actions) && (
        <header className="section__header">
          <div className="section__info">
            {title && (
              <TitleTag className="section__title h3" id={headingId}>
                {title}
              </TitleTag>
            )}
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
      )}
      <div className="section__body">{children}</div>
    </section>
  )
}

export default Section
