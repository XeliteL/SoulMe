import type { ReactNode } from "react"

import { formatDuration } from "@/shared/lib/format"
import ExpandableChips from "@/shared/ui/ExpandableChips"
import ExpandableText from "@/shared/ui/ExpandableText"

import { ageRatings } from "../../../../config/ageRatings"
import { genreLabels } from "../../../../config/genreLabels"
import { statusLabels } from "../../../../config/statusLabels"
import { tagLabels } from "../../../../config/tagLabels"
import { getReleaseYear } from "../../../../lib/getReleaseYear"
import type { Anime } from "../../../../model/types"

import "./AnimePosterPreview.scss"

type AnimePosterPreviewProps = Anime & { actions?: ReactNode }

const AnimePosterPreview = ({
  title,
  originalTitle,
  status,
  description,
  released,
  genres,
  tags,
  ageRating,
  actions,
  ...rest
}: AnimePosterPreviewProps) => {
  const year = getReleaseYear({ released })
  const items = [
    {
      id: `age-${ageRatings[ageRating].label}`,
      label: ageRatings[ageRating].label,
    },
    ...genres.map((genre) => ({
      id: `genre-${genreLabels[genre]}`,
      label: genreLabels[genre],
    })),
    ...(tags?.map((tag) => ({
      id: `tag-${tagLabels[tag]}`,
      label: `#${tagLabels[tag]}`,
    })) ?? []),
  ]

  return (
    <div className="anime-poster-preview" data-dropdown-boundary>
      <div className="anime-poster-preview__header">
        <p className="anime-poster-preview__title h5">{title}</p>
        <p className="anime-poster-preview__original-title">{originalTitle}</p>
      </div>
      <dl className="anime-poster-preview__info">
        <div className="anime-poster-preview__info-item">
          <dt className="anime-poster-preview__label">Статус</dt>
          <dd className="anime-poster-preview__value">
            {statusLabels[status]}
          </dd>
        </div>
        {year && (
          <div className="anime-poster-preview__info-item">
            <dt className="anime-poster-preview__label">Год выхода</dt>
            <dd className="anime-poster-preview__value">{year}</dd>
          </div>
        )}
        {"episodes" in rest && (
          <div className="anime-poster-preview__info-item">
            <dt className="anime-poster-preview__label">Эпизоды</dt>
            <dd className="anime-poster-preview__value">{rest.episodes}</dd>
          </div>
        )}
        {"duration" in rest && (
          <div className="anime-poster-preview__info-item">
            <dt className="anime-poster-preview__label">Длительность</dt>
            <dd className="anime-poster-preview__value">
              {formatDuration(rest.duration, "ru")}
            </dd>
          </div>
        )}
      </dl>
      <ExpandableText
        className="anime-poster-preview__description"
        text={description}
        lines={4}
      />
      <ExpandableChips className="anime-poster-preview__tags" items={items} />
      {actions && (
        <div className="anime-poster-preview__actions">{actions}</div>
      )}
    </div>
  )
}

export default AnimePosterPreview
