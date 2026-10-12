import classNames from "classnames"
import Image from "next/image"
import Link from "next/link"

import "./Logo.scss"

interface LogoProps {
  className?: string
  loading?: "eager" | "lazy"
}

const Logo = ({ className, loading }: LogoProps) => {
  const title: string = "Главная"

  return (
    <Link
      className={classNames(className, "logo")}
      href="/"
      title={title}
      aria-label={title}
    >
      <Image
        className="logo__image"
        src="/logo.svg"
        alt=""
        width={60}
        height={60}
        loading={loading}
      />
    </Link>
  )
}

export default Logo
