import classNames from "classnames"
import "./Logo.scss"

interface LogoProps {
  className?: string
  loading?: "eager" | "lazy"
}

const Logo = ({ className, loading }: LogoProps) => {
  const title: string = "Home"

  return (
    <a
      className={classNames(className, "logo")}
      href="/"
      title={title}
      aria-label={title}
    >
      <img
        className="logo__image"
        src="/logo.svg"
        alt=""
        width={199}
        height={60}
        loading={loading}
      />
    </a>
  )
}

export default Logo
