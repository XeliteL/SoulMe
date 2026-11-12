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
  title,
  imgSrc,
  views,
  released,
  rating,
  href,
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

  return (
    <Link className="anime-card" href={href} title={title}>
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
      <div className="anime-card__body">
        {showReleaseDate ? (
          <Badge className="anime-card__released-badge">
            {released ? (
              <>
                {RELEASE_PREFIX[status]}{" "}
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
                    <span className="hidden-mobile">{duration}</span>
                    <span className="visible-mobile">{rest.episodes} сер.</span>
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
