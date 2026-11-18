import Badge from "@/shared/ui/Badge"
import RatingView from "@/shared/ui/RatingView"

import type { Anime } from "../../model/types"

import "./AnimeCardsBadges.scss"

interface AnimeCardsBadgesProps {
  status: Anime["status"]
  rating: Anime["rating"]
  isFavorite?: boolean
}

const AnimeCardsBadges = ({
  status,
  rating,
  isFavorite,
}: AnimeCardsBadgesProps) => {
  return (
    <div className="anime-cards-badges">
      {status !== "announced" && (
        <Badge className="anime-cards-badges__rating" variant="accent">
          <RatingView
            value={rating.value}
            reviewsCount={rating.reviewsCount}
            isSolid
          />
        </Badge>
      )}
      {isFavorite && (
        <Badge
          className="anime-cards-badges__favorite"
          variant="favorite"
          iconName="heart"
          iconLabel="В избранном"
        />
      )}
    </div>
  )
}

export default AnimeCardsBadges
