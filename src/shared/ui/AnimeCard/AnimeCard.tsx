import { Image } from "minista/assets"

import Badge from "@/shared/ui/Badge"
import RatingView from "@/shared/ui/RatingView"
import { formatCompactNumberRu } from "@/shared/utils/ru/formatCompactNumberRu"
import { formatDurationRu } from "@/shared/utils/ru/formatDurationRu"
import { pluralizeRu } from "@/shared/utils/ru/pluralizeRu"

import "./AnimeCard.scss"

interface AnimeCardBaseProps {
  title: string
  imgSrc: string
  views: number
  released: {
    label: string
    dateTime: string
  }
  rating: {
    value: number
    label: number
  }
  href: string
  showReleaseDate?: boolean
  showRating?: boolean
}

type AnimeCardProps =
  | (AnimeCardBaseProps & { type: "film"; duration: number })
  | (AnimeCardBaseProps & { type: "serial"; episodes: number })

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
      ? formatDurationRu(rest.duration)
      : pluralizeRu(rest.episodes, ["серия", "серии", "серий"])

  return (
    <a className="anime-card" href={href} title={title}>
      <h3 className="visually-hidden">{title}</h3>
      <Image className="anime-card__image" src={imgSrc} />
      <div className="anime-card__body">
        {showReleaseDate ? (
          <Badge className="anime-card__released-badge ">
            Вышел <time dateTime={released.dateTime}>{released.label}</time>
          </Badge>
        ) : (
          <>
            {duration && (
              <Badge
                iconName="duration"
                iconAriaLabel="Длительность"
                hasFillIcon
              >
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
                  label={formatCompactNumberRu(rating.label)}
                />
              </Badge>
            ) : (
              <>
                {views > 0 && (
                  <Badge
                    iconName="views"
                    iconAriaLabel="Количество просмотров"
                    hasFillIcon
                  >
                    {formatCompactNumberRu(views)}
                  </Badge>
                )}
              </>
            )}
          </>
        )}
      </div>
    </a>
  )
}

export default AnimeCard
