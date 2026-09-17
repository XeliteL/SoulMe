import { Image } from "minista/assets"

import Button from "@/shared/ui/Button"

import "./AnimeBannerCard.scss"

interface AnimeBannerCardProps {
  title: string
  description: string
  imgSrc: string
}

const AnimeBannerCard = ({
  title,
  description,
  imgSrc,
}: AnimeBannerCardProps) => {
  return (
    <div className="anime-banner-card">
      <Image className="anime-banner-card__image" src={imgSrc} alt="" />
      <div className="anime-banner-card__inner">
        <div className="anime-banner-card__body">
          <h2 className="anime-banner-card__title h2">{title}</h2>
          <div className="anime-banner-card__description hidden-mobile">
            <p>{description}</p>
          </div>
        </div>
        <div className="anime-banner-card__footer">
          <Button
            className="anime-banner-card__play-button"
            iconName="play"
            label="Смотреть"
            hasFillIcon
          />
          <div className="anime-banner-card__actions">
            <Button
              variant="black-06"
              iconName="plus"
              label="Добавить в плейлист"
              isLabelHidden
            />
            <Button
              variant="black-06"
              iconName="like"
              label="Любимое"
              isLabelHidden
            />
            <Button
              variant="black-06"
              iconName="volume"
              label="Выключить звук"
              isLabelHidden
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnimeBannerCard
