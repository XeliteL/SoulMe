import Image from "next/image"
import Link from "next/link"

import { typeLabels } from "../../config/typeLabels"
import { getAnimeHref } from "../../lib/getHref"
import type { Anime } from "../../model/types"

import "./AnimePosterCard.scss"

const POSTER_WIDTH = 324
const POSTER_HEIGHT = 452

const AnimePosterCard = ({ id, title, imgSrc, type }: Anime) => {
  return (
    <Link className="anime-poster-card" href={getAnimeHref(id)} title={title}>
      <div className="anime-poster-card__image-container">
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
        <h3 className="anime-poster-card__title h5">{title}</h3>
        <div className="anime-poster-card__type">{typeLabels[type]}</div>
      </div>
    </Link>
  )
}

export default AnimePosterCard
