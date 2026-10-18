"use client"

import { ComponentProps, useState } from "react"

import Button from "@/shared/ui/Button"

type PasswordInputProps = Omit<ComponentProps<"input">, "type">

const PasswordInput = (props: PasswordInputProps) => {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className="field__password">
      <input {...props} type={isVisible ? "text" : "password"} />
      <Button
        className="field__password-toggle"
        variant="transparent"
        label={isVisible ? "Скрыть пароль" : "Показать пароль"}
        isLabelHidden
        iconName={isVisible ? "eye-off" : "eye"}
        hasFillIcon
        onClick={() => setIsVisible(!isVisible)}
      />
    </div>
  )
}

export default PasswordInput
