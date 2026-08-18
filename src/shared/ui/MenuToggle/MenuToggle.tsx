import { useEffect, useState } from "react"
import BurgerButton from "@/shared/ui/BurgerButton"

interface MenuToggleProps {
  dialogId: string
  className?: string
}

const MenuToggle = ({ dialogId, className }: MenuToggleProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle("is-lock", isMenuOpen)

    return () => {
      document.documentElement.classList.remove("is-lock")
    }
  }, [isMenuOpen])

  useEffect(() => {
    const dialog = document.getElementById(dialogId) as HTMLDialogElement | null
    if (!dialog) return

    if (isMenuOpen) {
      dialog.classList.remove("is-closing")
      if (!dialog.open) dialog.show()
      return
    }

    if (!dialog.open) return

    dialog.classList.add("is-closing")

    const handleTransitionEnd = (event: TransitionEvent) => {
      if (event.target !== dialog) return
      dialog.classList.remove("is-closing")
      dialog.close()
    }
    dialog.addEventListener("transitionend", handleTransitionEnd)
    return () =>
      dialog.removeEventListener("transitionend", handleTransitionEnd)
  }, [isMenuOpen, dialogId])

  useEffect(() => {
    const dialog = document.getElementById(dialogId) as HTMLDialogElement | null
    if (!dialog) return

    const handleClose = () => setIsMenuOpen(false)
    dialog.addEventListener("close", handleClose)
    return () => dialog.removeEventListener("close", handleClose)
  }, [dialogId])

  useEffect(() => {
    if (!isMenuOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false)
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isMenuOpen])

  return (
    <BurgerButton
      className={className}
      isActive={isMenuOpen}
      onClick={() => setIsMenuOpen((prev) => !prev)}
    />
  )
}

export default MenuToggle
