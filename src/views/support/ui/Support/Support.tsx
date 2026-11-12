import { SupportForm } from "@/features/support"

import "./Support.scss"

const Support = () => {
  const titleId = "support-title"

  return (
    <section className="support container" aria-labelledby={titleId} id="form">
      <div className="support__body">
        <div className="support__info">
          <h1 className="support__title h2" id={titleId}>
            Добро пожаловать на страницу поддержки!
          </h1>
          <div className="support__description">
            <p>
              Мы здесь для того, чтобы помочь вам с проблемами, возникающими во
              время использования нашего продукта.
            </p>
          </div>
        </div>
        <div className="support__image" aria-hidden="true" />
      </div>
      <SupportForm />
    </section>
  )
}

export default Support
