import type { CSSProperties } from "react"
import Image from "next/image"

import { formatRating, pluralize } from "@/shared/lib/format"

import "./RatingView.scss"

type RatingViewProps = { value: number } & (
  | { type?: "base"; reviewsCount: number }
  | { type: "user"; reviewsCount?: never }
)

const RatingView = (props: RatingViewProps) => {
  const { value } = props
  const grade = formatRating(value, "ru")
  const isUser = props.type === "user"
  const ariaLabel = isUser ? `Ваша оценка ${grade}` : `Оценка ${grade} из 10`
  const title = isUser
    ? "Ваша оценка"
    : `Оценка на основе ${pluralize(
        props.reviewsCount,
        { one: "отзыва", few: "отзывов", many: "отзывов", other: "отзывов" },
        "ru",
      )}`

  return (
    <div
      className="rating-view"
      style={
        {
          "--ratingViewValue": value,
        } as CSSProperties
      }
      role="img"
      title={title}
      aria-label={ariaLabel}
    >
      <div className="rating-view__star">
        {isUser ? (
          <Image
            className="rating-view__star-user"
            src="/rating/star-user.svg"
            alt=""
            width={18}
            height={18}
            loading="lazy"
          />
        ) : (
          <>
            <Image
              className="rating-view__star-unfilled"
              src="/rating/star-unfilled.svg"
              alt=""
              width={18}
              height={18}
              loading="lazy"
            />
            <Image
              className="rating-view__star-filled"
              src="/rating/star-filled.svg"
              alt=""
              width={18}
              height={18}
              loading="lazy"
            />
          </>
        )}
      </div>
      <span>{grade}</span>
    </div>
  )
}

export default RatingView
