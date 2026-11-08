"use client"

import { useRouter } from "next/navigation"

const BackButton = () => {
  const router = useRouter()

  const handleClick = () => {
    if (window.history.length > 1) {
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
