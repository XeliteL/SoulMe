import { ReactNode } from "react"

import "./Accordion.scss"

interface AccordionProps {
  title: string
  id: string
  name: string
  children: ReactNode
}

const Accordion = ({ title, id, name, children }: AccordionProps) => {
  return (
    <div className="accordion">
      <details className="accordion__details" name={name}>
        <summary className="accordion__summary" aria-controls={id}>
          <h3 className="accordion__title h5" id={`${id}-title`}>
            {title}
          </h3>
        </summary>
      </details>
      <div
        className="accordion__content"
        id={id}
        role="region"
        aria-labelledby={`${id}-title`}
      >
        <div className="accordion__content-inner">
          <div className="accordion__content-body">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default Accordion
