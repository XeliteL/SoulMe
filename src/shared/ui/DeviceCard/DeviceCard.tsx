import "./DeviceCard.scss"

interface DeviceCardProps {
  title: string
  description: string
  imgSrc: string
}

const DeviceCard = ({ title, description, imgSrc }: DeviceCardProps) => {
  return (
    <div className="device-card">
      <header className="device-card__header">
        <div className="device-card__image-wrapper">
          <img
            className="device-card__image"
            src={imgSrc}
            alt=""
            width={40}
            height={40}
            loading="lazy"
          />
        </div>
        <h3 className="device-card__title h4">{title}</h3>
      </header>
      <div className="device-card__description">
        <p>{description}</p>
      </div>
    </div>
  )
}

export default DeviceCard
