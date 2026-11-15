import Button from "@/shared/ui/Button"

import "./Banner.scss"

const Banner = () => {
  const titleId = "banner-title"

  return (
    <section className="banner container" aria-labelledby={titleId}>
      <div className="banner__inner">
        <div className="banner__body">
          <h2 className="banner__title" id={titleId}>
            Не знаешь, что посмотреть?
          </h2>
          <div className="banner__description">
            <p>Отфильтруй каталог по жанру, году и рейтингу</p>
          </div>
        </div>
        <Button
          className="banner__button"
          label="Выбрать аниме"
          href="/anime/filter"
        />
      </div>
    </section>
  )
}

export default Banner
