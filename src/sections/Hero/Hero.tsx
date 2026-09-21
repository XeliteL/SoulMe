import Button from "@/shared/ui/Button"

import "./Hero.scss"

const Hero = () => {
  const titleId = "hero-title"
  const playButtonTitle = "Начать просмотр"

  return (
    <section className="hero" aria-labelledby={titleId}>
      <div className="hero__pano">
        <div className="hero__pano-inner container">
          <button
            className="hero__play-button"
            type="button"
            aria-label={playButtonTitle}
            title={playButtonTitle}
          >
            <img
              className="hero__play-button-image"
              src="/play.svg"
              alt=""
              width={470}
              height={470}
              loading="lazy"
            />
          </button>
        </div>
      </div>
      <div className="hero__body">
        <div className="hero__body-inner container">
          <h1 className="hero__title" id={titleId}>
            Аниме без границ
          </h1>
          <div className="hero__description">
            <p>
              SoulMe — твой доступ к тысячам аниме-тайтлов с озвучкой и
              субтитрами на русском. Новые серии - почти одновременно с Японией,
              плюс классика, сезонные новинки и фильмы с сериалами на любой вкус
              в одном каталоге. Собирай свой вотчлист и не теряй серии, на
              которых остановился.
            </p>
            <Button
              className="hero__button"
              hasFillIcon
              iconName="play"
              label="Начать просмотр"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
