import { Image } from "minista/assets"

import Badge from "@/shared/ui/Badge"
import Icon from "@/shared/ui/Icon"

import "./CategoryCard.scss"

interface CategoryCardProps {
  title: string
  images: string[]
  href: string
  badge?: string
}

const CategoryCard = ({
  title,
  images = [],
  href,
  badge,
}: CategoryCardProps) => {
  return (
    <a className="category-card" href={href}>
      <div className="category-card__images">
        {images.map((imgSrc, index) => (
          <Image
            className="category-card__image"
            src={imgSrc}
            format="webp"
            quality={82}
            loading="lazy"
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
    </a>
  )
}

export default CategoryCard
