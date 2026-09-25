import "./LegalDocument.scss"

export interface LegalDocumentItem {
  id: string
  title: string
  paragraphs: string[]
}

interface LegalDocumentProps {
  title: string
  updatedAt: string
  items: LegalDocumentItem[]
}

const dateFormatter = new Intl.DateTimeFormat("ru-RU", { dateStyle: "long" })

const LegalDocument = ({ title, updatedAt, items }: LegalDocumentProps) => {
  return (
    <article className="legal-document container">
      <header className="legal-document__header">
        <h1 className="legal-document__title">{title}</h1>
        <p className="legal-document__updated">
          Последнее обновление:{" "}
          <time dateTime={updatedAt}>
            {dateFormatter.format(new Date(updatedAt))}
          </time>
        </p>
      </header>
      <nav className="legal-document__toc" aria-label="Содержание">
        <ol className="legal-document__toc-list">
          {items.map((item) => (
            <li key={item.id}>
              <a className="legal-document__toc-link" href={`#${item.id}`}>
                {item.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>
      <ol className="legal-document__list">
        {items.map((item) => (
          <li className="legal-document__item" key={item.id}>
            <section aria-labelledby={`${item.id}-title`} id={item.id}>
              <h2
                className="legal-document__item-title h4"
                id={`${item.id}-title`}
              >
                {item.title}
              </h2>
              {item.paragraphs.map((paragraph, index) => (
                <p className="legal-document__paragraph" key={index}>
                  {paragraph}
                </p>
              ))}
            </section>
          </li>
        ))}
      </ol>
    </article>
  )
}

export default LegalDocument
