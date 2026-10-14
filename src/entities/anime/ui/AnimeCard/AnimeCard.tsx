import Image from "next/image"
import Link from "next/link"

import {
  formatCompactNumber,
  formatDuration,
  pluralize,
} from "@/shared/lib/format"
import Badge from "@/shared/ui/Badge"
import RatingView from "@/shared/ui/RatingView"

import type { Anime } from "../../model/types"

import "./AnimeCard.scss"

const IMAGE_WIDTH = 116
const IMAGE_HEIGHT = 124

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
  ...rest
}: AnimeCardProps) => {
  const duration =
    rest.type === "film"
      ? formatDuration(rest.duration, "ru")
      : pluralize(
          rest.episodes,
          { one: "серия", few: "серии", many: "серий", other: "серии" },
          "ru",
        )

  return (
    <Link className="anime-card" href={href} title={title}>
      <h3 className="visually-hidden">{title}</h3>
      <Image
        className="anime-card__image"
        src={imgSrc}
        width={IMAGE_WIDTH}
        height={IMAGE_HEIGHT}
        sizes="(max-width: 767px) 50vw, 20vw"
        alt=""
      />
      <div className="anime-card__body">
        {showReleaseDate ? (
          <Badge className="anime-card__released-badge ">
            Вышел <time dateTime={released.dateTime}>{released.label}</time>
          </Badge>
        ) : (
          <>
            {duration && (
              <Badge iconName="duration" iconLabel="Длительность" hasFillIcon>
                {rest.type === "serial" ? (
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
                  label={formatCompactNumber(rating.label, "ru")}
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
