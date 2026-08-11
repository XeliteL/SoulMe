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

    if (isMenuOpen && !dialog.open) {
      dialog.show()
    }
    if (!isMenuOpen && dialog.open) {
      dialog.close()
    }

    const handleClose = () => setIsMenuOpen(false)
    dialog.addEventListener("close", handleClose)
    return () => dialog.removeEventListener("close", handleClose)
  }, [isMenuOpen, dialogId])

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
