import classNames from "classnames"
import Image from "next/image"
import Link from "next/link"

import {
  formatCompactNumber,
  formatDuration,
  pluralize,
} from "@/shared/lib/format"
import Badge from "@/shared/ui/Badge"
import RatingView from "@/shared/ui/RatingView"

import { statusLabels } from "../../config/statusLabels"
import { getAnimeHref } from "../../lib/getHref"
import type { Anime, AnimeStatus } from "../../model/types"

import "./AnimeCard.scss"

const IMAGE_WIDTH = 200
const IMAGE_HEIGHT = 225
const RELEASE_PREFIX: Record<AnimeStatus, string> = {
  announced: "Выйдет",
  ongoing: "Выходит с",
  released: "Вышел",
}

type AnimeCardProps = Anime & {
  showReleaseDate?: boolean
  showRating?: boolean
}

const AnimeCard = ({
  id,
  title,
  imgSrc,
  views,
  released,
  rating,
  showReleaseDate,
  showRating,
  status,
  ...rest
}: AnimeCardProps) => {
  const duration =
    "duration" in rest
      ? formatDuration(rest.duration, "ru")
      : "episodes" in rest
        ? pluralize(
            rest.episodes,
            { one: "серия", few: "серии", many: "серий", other: "серии" },
            "ru",
          )
        : undefined

  const isViewsShown = !showReleaseDate && !showRating

  return (
    <Link className="anime-card" href={getAnimeHref(id)} title={title}>
      <h3 className="visually-hidden">{title}</h3>
      <div className="anime-card__image-container">
        <Image
          className="anime-card__image"
          src={imgSrc}
          width={IMAGE_WIDTH}
          height={IMAGE_HEIGHT}
          sizes="(max-width: 767px) 50vw, 20vw"
          alt=""
        />
      </div>
      <div
        className={classNames("anime-card__body", {
          "anime-card__body--views": isViewsShown,
        })}
      >
        {showReleaseDate ? (
          <Badge className="anime-card__released-badge">
            {released ? (
              <>
                <span className="hidden-tablet">{RELEASE_PREFIX[status]} </span>
                <time dateTime={released.dateTime}>{released.label}</time>
              </>
            ) : (
              statusLabels.announced
            )}
          </Badge>
        ) : (
          <>
            {duration && (
              <Badge iconName="duration" iconLabel="Длительность" hasFillIcon>
                {"episodes" in rest ? (
                  <>
                    <span className="anime-card__full">{duration}</span>
                    <span className="anime-card__short">
                      {rest.episodes} сер.
                    </span>
                  </>
                ) : (
                  duration
                )}
              </Badge>
            )}
            {showRating ? (
              <Badge className="anime-card__rating-badge">
                <RatingView
                  value={rating.value}
                  reviewsCount={rating.reviewsCount}
                />
              </Badge>
            ) : (
              <>
                {views > 0 && (
                  <Badge
                    iconName="views"
                    iconLabel="Количество просмотров"
                    hasFillIcon
                  >
                    {formatCompactNumber(views, "ru")}
                  </Badge>
                )}
              </>
            )}
          </>
        )}
      </div>
    </Link>
  )
}

export default AnimeCard
