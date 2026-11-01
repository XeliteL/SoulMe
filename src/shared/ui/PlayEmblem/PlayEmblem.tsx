import Image from "next/image"

import "./PlayEmblem.scss"

const PlayEmblem = () => {
  return (
    <div className="play-emblem">
      <Image
        className="play-emblem__image"
        src="/brand/play.svg"
        alt=""
        width={470}
        height={470}
        loading="eager"
      />
    </div>
  )
}

export default PlayEmblem
