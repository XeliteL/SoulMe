import type { CSSProperties } from "react"
import classNames from "classnames"

import { formatRating, pluralize } from "@/shared/lib/format"
import Icon from "@/shared/ui/Icon"

import "./RatingView.scss"

type RatingViewProps = {
  className?: string
  value: number
  isSolid?: boolean
} & (
  | { type?: "base"; reviewsCount: number }
  | { type: "user"; reviewsCount?: never }
)

const RatingView = (props: RatingViewProps) => {
  const { className, value } = props
  const grade = formatRating(value, "ru")
  const isUser = props.type === "user"
  const isSolid = props.isSolid || isUser
  const ariaLabel = isUser ? `Ваша оценка ${grade}` : `Оценка ${grade} из 10`
  const title = isUser
    ? "Ваша оценка"
    : `Оценка на основе ${pluralize(
        props.reviewsCount,
        { one: "отзыва", few: "отзывов", many: "отзывов", other: "отзывов" },
        "ru",
      )}`

  return (
    <span
      className={classNames(className, "rating-view")}
      style={
        {
          "--ratingViewValue": value,
        } as CSSProperties
      }
      role="img"
      title={title}
      aria-label={ariaLabel}
    >
      <span className="rating-view__star">
        {isSolid ? (
          <Icon className="rating-view__star-solid" name="star" hasFill />
        ) : (
          <>
            <Icon className="rating-view__star-unfilled" name="star" hasFill />
            <Icon className="rating-view__star-filled" name="star" hasFill />
          </>
        )}
      </span>
      <span>{grade}</span>
    </span>
  )
}

export default RatingView
