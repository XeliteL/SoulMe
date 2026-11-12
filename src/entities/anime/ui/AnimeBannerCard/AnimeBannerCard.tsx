import { ReactNode } from "react"
import Image from "next/image"

import Button from "@/shared/ui/Button"

import { getAnimeHref, getAnimePlayerHref } from "../../lib/getHref"
import type { Anime, AnimeBanner } from "../../model/types"

import "./AnimeBannerCard.scss"

const IMAGE_WIDTH = 1605
const IMAGE_HEIGHT = 835

type AnimeBannerCardProps = Omit<AnimeBanner, "animeId"> & {
  anime: Anime
  loading?: "eager" | "lazy"
  actions?: ReactNode
}

const AnimeBannerCard = ({
  anime: { title, id },
  description,
  imgSrc,
  loading,
  actions,
}: AnimeBannerCardProps) => {
  return (
    <div className="anime-banner-card">
      <Image
        className="anime-banner-card__image"
        src={imgSrc}
        width={IMAGE_WIDTH}
        height={IMAGE_HEIGHT}
        sizes="100vw"
        loading={loading}
        fetchPriority={loading === "eager" ? "high" : undefined}
        alt=""
      />
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
            href={getAnimePlayerHref(id)}
            iconName="play"
            label="Смотреть"
            hasFillIcon
          />
          <div className="anime-banner-card__actions">
            {actions}
            <Button
              variant="black-06"
              iconName="information"
              label="Информация"
              href={getAnimeHref(id)}
              isLabelHidden
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnimeBannerCard
