"use client"

import { useRouter } from "next/navigation"

const isSameOriginReferrer = () =>
  URL.canParse(document.referrer) &&
  new URL(document.referrer).origin === window.location.origin

const canGoBack = () => {
  const navigation: Navigation | undefined = window.navigation

  return navigation
    ? navigation.canGoBack
    : window.history.length > 1 && isSameOriginReferrer()
}

const BackButton = () => {
  const router = useRouter()

  const handleClick = () => {
    if (canGoBack()) {
      router.back()
    } else {
      router.push("/")
    }
  }

  return (
    <button className="not-found__back" type="button" onClick={handleClick}>
      вернитесь назад
    </button>
  )
}

export default BackButton
