import type { CSSProperties } from "react"

import "./RatingView.scss"

interface RatingViewProps {
  value: number
  label: string
}

const RatingView = ({ value = 5, label }: RatingViewProps) => {
  const ariaLabel = `Оценка: ${value} звёзд`

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
        <img
          className="rating-view__stars-unfilled"
          src="/rating/stars-unfilled.svg"
          alt=""
          width={98}
          height={18}
          loading="lazy"
        />
        <img
          className="rating-view__stars-filled"
          src="/rating/stars-filled.svg"
          alt=""
          width={98}
          height={20}
          loading="lazy"
        />
      </div>
      {label && <div className="rating-view__label">{label}</div>}
    </div>
  )
}

export default RatingView
