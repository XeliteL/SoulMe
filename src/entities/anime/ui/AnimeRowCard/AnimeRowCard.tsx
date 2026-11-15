import Image from "next/image"
import Link from "next/link"

import { genreLabels } from "../../config/genreLabels"
import { statusLabels } from "../../config/statusLabels"
import { typeLabels } from "../../config/typeLabels"
import { getAnimeHref } from "../../lib/getHref"
import type { Anime } from "../../model/types"

import "./AnimeRowCard.scss"

const POSTER_WIDTH = 324
const POSTER_HEIGHT = 452

const AnimeRowCard = ({
  id,
  title,
  imgSrc,
  type,
  description,
  originalTitle,
  released,
  genres,
}: Anime) => {
  const year = released ? released.dateTime.slice(0, 4) : statusLabels.announced
  const info = [
    typeLabels[type],
    year,
    genres.map((genre) => genreLabels[genre]).join(", "),
  ].join(" / ")

  return (
    <Link className="anime-row-card" href={getAnimeHref(id)} title={title}>
      <div className="anime-row-card__image-container">
        <Image
          className="anime-row-card__image"
          src={imgSrc}
          width={POSTER_WIDTH}
          height={POSTER_HEIGHT}
          sizes="162px"
          alt=""
        />
      </div>
      <div className="anime-row-card__body">
        <div className="anime-row-card__info">{originalTitle}</div>
        <h3 className="anime-row-card__title h5">{title}</h3>
        <div className="anime-row-card__info">{info}</div>
        <p className="anime-row-card__description">{description}</p>
      </div>
    </Link>
  )
}

export default AnimeRowCard
