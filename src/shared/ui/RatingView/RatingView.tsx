import type { CSSProperties } from "react"
import Image from "next/image"

import { pluralize } from "@/shared/lib/format"

import "./RatingView.scss"

interface RatingViewProps {
  value: number
  label: string
}

const RatingView = ({ value = 5, label }: RatingViewProps) => {
  const stars = pluralize(
    value,
    { one: "звезда", few: "звезды", many: "звёзд", other: "звезды" },
    "ru",
  )
  const ariaLabel = `Оценка: ${stars}`

  return (
    <div
      className="rating-view"
      aria-label={ariaLabel}
      title={ariaLabel}
      style={
        {
          "--ratingViewValue": value,
        } as CSSProperties
      }
    >
      <div className="rating-view__stars">
        <Image
          className="rating-view__stars-unfilled"
          src="/rating/stars-unfilled.svg"
          alt=""
          width={98}
          height={18}
          loading="lazy"
        />
        <Image
          className="rating-view__stars-filled"
          src="/rating/stars-filled.svg"
          alt=""
          width={98}
          height={18}
          loading="lazy"
        />
      </div>
      {label && <div className="rating-view__label">{label}</div>}
    </div>
  )
}

export default RatingView
