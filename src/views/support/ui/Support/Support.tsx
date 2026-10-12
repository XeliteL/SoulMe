import Link from "next/link"

import Button from "@/shared/ui/Button"
import Checkbox from "@/shared/ui/Checkbox"
import Field from "@/shared/ui/Field"
import InputMaskRuntime from "@/shared/ui/Field/components/InputMaskRuntime"
import Select from "@/shared/ui/Select"

import { phoneCodes } from "./config/phoneCodes"

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
      <form className="support__form" action="">
        <Field
          className="support__form-cell"
          label="Имя"
          placeholder="Иван"
          isRequired
        />
        <Field
          className="support__form-cell"
          label="Фамилия"
          placeholder="Иванов"
        />
        <Field
          className="support__form-cell"
          label="Email"
          type="email"
          placeholder="example@example.com"
          isRequired
        />
        <Field
          className="support__form-cell"
          label="Номер телефона"
          placeholder="(999) 999-99-99"
          inputMode="tel"
          mask="(000) 000-00-00"
          renderBefore={(controlClassName) => (
            <Select
              id="support-phone-code"
              name="phoneCode"
              label="Телефонный код страны"
              buttonClassName={controlClassName}
              options={phoneCodes}
            />
          )}
        />
        <Field
          className="support__form-cell support__form-cell--wide"
          label="Ваша проблема"
          type="textarea"
          placeholder="Здравствуйте, у меня вопрос..."
          isRequired
        />
        <div className="support__form-cell support__form-cell--wide support__form-cell--actions">
          <Checkbox
            className="support__form-agreement"
            label={
              <>
                Я соглашаюсь с{" "}
                <Link
                  href="/legal/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  условиями использования
                </Link>{" "}
                и{" "}
                <Link
                  href="/legal/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  политикой конфиденциальности
                </Link>
              </>
            }
            isRequired
          />
          <Button
            className="support__form-submit-button"
            label="Отправить сообщение"
            type="submit"
          ></Button>
        </div>
      </form>
      <InputMaskRuntime />
    </section>
  )
}

export default Support
