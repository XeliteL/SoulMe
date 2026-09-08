import { Image } from "minista/assets"

import Icon from "@/shared/ui/Icon"

import "./CategoryCard.scss"

interface CategoryCardProps {
  title: string
  images: string[]
}

const CategoryCard = ({ title, images = [] }: CategoryCardProps) => {
  return (
    <a className="category-card" href="/anime">
      <div className="category-card__images">
        {images.map((imgSrc, index) => (
          <Image
            className="category-card__image"
            src={imgSrc}
            alt=""
            key={index}
          />
        ))}
      </div>
      <div className="category-card__body">
        <h3 className="category-card__title h5">{title}</h3>
        <Icon className="category-card__icon" name="arrow-right" />
      </div>
    </a>
  )
}

export default CategoryCard
