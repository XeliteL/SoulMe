import Image from "next/image"
import Link from "next/link"

import "./NotFoundPage.scss"

const NotFoundPage = () => {
  return (
    <div className="not-found">
      <div className="not-found__decor">
        <Image
          className="not-found__image"
          src="/images/not-found/not-found.webp"
          width={150}
          height={150}
          alt=""
        />
        <div className="not-found__error">404</div>
      </div>
      <div className="not-found__text">
        <h1 className="not-found__title h2">Страница не найдена</h1>
        <p className="not-found__description">
          Страница, к которой вы обращаетесь, не найдена.
          <br />
          Пожалуйста, перейдите на <Link href="/">главную страницу сайта</Link>.
        </p>
      </div>
    </div>
  )
}

export default NotFoundPage
