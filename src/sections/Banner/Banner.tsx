import Button from "@/shared/ui/Button"

import "./Banner.scss"

const Banner = () => {
  const titleId = "banner-title"

  return (
    <section className="banner container" aria-labelledby={titleId}>
      <div className="banner__inner">
        <div className="banner__body">
          <h2 className="banner__title" id={titleId}>
            Добро пожаловать в SoulMe!
          </h2>
          <div className="banner__description">
            <p>
              Войдите в аккаунт SoulMe, чтобы синхронизировать ваши закладки .
            </p>
          </div>
        </div>
        <Button
          className="banner__button"
          label="Войти в аккаунт"
          href="/auth"
        />
      </div>
    </section>
  )
}

export default Banner
