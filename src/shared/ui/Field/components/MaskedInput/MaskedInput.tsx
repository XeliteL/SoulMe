"use client"

import { ComponentProps, useEffect, useRef } from "react"
import IMask from "imask"

interface MaskedInputProps extends ComponentProps<"input"> {
  mask: string
}

const MaskedInput = ({ mask, ...props }: MaskedInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!inputRef.current) return

    const maskInstance = IMask(inputRef.current, { mask })
    return () => maskInstance.destroy()
  }, [mask])

  return <input ref={inputRef} {...props} />
}

export default MaskedInput
