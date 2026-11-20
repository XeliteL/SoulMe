import type { ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"

import { typeLabels } from "../../config/typeLabels"
import { getAnimeHref } from "../../lib/getHref"
import type { Anime } from "../../model/types"
import AnimeCardsBadges from "../AnimeCardsBadges"
import AnimePosterPreview from "./components/AnimePosterPreview"

import "./AnimePosterCard.scss"

const POSTER_WIDTH = 324
const POSTER_HEIGHT = 452

type AnimePosterCardProps = Anime & {
  isFavorite?: boolean
  actions?: ReactNode
}

const AnimePosterCard = ({
  isFavorite,
  actions,
  ...anime
}: AnimePosterCardProps) => {
  const { id, title, imgSrc, type, rating, status } = anime

  return (
    <article className="anime-poster-card">
      <div className="anime-poster-card__image-container">
        <AnimeCardsBadges
          status={status}
          rating={rating}
          isFavorite={isFavorite}
        />
        <Image
          className="anime-poster-card__image"
          src={imgSrc}
          width={POSTER_WIDTH}
          height={POSTER_HEIGHT}
          sizes="(max-width: 480px) 50vw, 240px"
          alt=""
        />
      </div>
      <div className="anime-poster-card__description">
        <h3 className="anime-poster-card__title h5">
          <Link className="anime-poster-card__link" href={getAnimeHref(id)}>
            {title}
          </Link>
        </h3>
        <div className="anime-poster-card__type">{typeLabels[type]}</div>
      </div>
      <AnimePosterPreview {...anime} actions={actions} />
    </article>
  )
}

export default AnimePosterCard
