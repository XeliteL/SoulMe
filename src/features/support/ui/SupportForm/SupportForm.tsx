import Link from "next/link"

import Button from "@/shared/ui/Button"
import Checkbox from "@/shared/ui/Checkbox"
import Field from "@/shared/ui/Field"
import Select from "@/shared/ui/Select"

import { phoneCodes } from "./config/phoneCodes"

import "./SupportForm.scss"

const SupportForm = () => {
  return (
    <form className="support-form" action="">
      <Field
        className="support-form__cell"
        label="Имя"
        name="firstname"
        placeholder="Иван"
        isRequired
        autoComplete="given-name"
      />
      <Field
        className="support-form__cell"
        label="Фамилия"
        name="lastname"
        placeholder="Иванов"
        autoComplete="family-name"
      />
      <Field
        className="support-form__cell"
        label="Email"
        name="email"
        type="email"
        placeholder="example@example.com"
        isRequired
        autoComplete="email"
      />
      <Field
        className="support-form__cell"
        label="Номер телефона"
        name="phone"
        placeholder="(999) 999-99-99"
        inputMode="tel"
        mask="(000) 000-00-00"
        autoComplete="tel-national"
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
        className="support-form__cell support-form__cell--wide"
        label="Ваша проблема"
        name="message"
        type="textarea"
        placeholder="Здравствуйте, у меня вопрос..."
        isRequired
      />
      <div className="support-form__cell support-form__cell--wide support-form__cell--actions">
        <Checkbox
          className="support-form__agreement"
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
          name="agreement"
          isRequired
        />
        <Button
          className="support-form__submit-button"
          label="Отправить сообщение"
          type="submit"
        ></Button>
      </div>
    </form>
  )
}

export default SupportForm
