import Image from "next/image"
import Link from "next/link"

import Badge from "@/shared/ui/Badge"
import Icon from "@/shared/ui/Icon"

import type { Category } from "../../model/types"

import "./CategoryCard.scss"

const IMAGE_WIDTH = 116
const IMAGE_HEIGHT = 124

type CategoryCardProps = Category & {
  badge?: string
}

const CategoryCard = ({
  title,
  images = [],
  href,
  badge,
}: CategoryCardProps) => {
  return (
    <Link className="category-card" href={href}>
      <div className="category-card__images">
        {images.map((imgSrc, index) => (
          <Image
            className="category-card__image"
            src={imgSrc}
            width={IMAGE_WIDTH}
            height={IMAGE_HEIGHT}
            sizes="(max-width: 767px) 25vw, 10vw"
            quality={82}
            alt=""
            key={index}
          />
        ))}
      </div>
      <div className="category-card__body">
        <h3 className="category-card__title h5">
          {badge && (
            <Badge className="category-card__badge" variant="accent">
              {badge}
            </Badge>
          )}
          <span>{title}</span>
        </h3>
        <Icon className="category-card__icon" name="arrow-right" />
      </div>
    </Link>
  )
}

export default CategoryCard
