import { useEffect } from "react"
import IMask, { InputMask } from "imask"

const useInputMaskRuntime = () => {
  useEffect(() => {
    const masks: { el: HTMLInputElement; mask: InputMask }[] = []

    document
      .querySelectorAll<HTMLInputElement>("[data-js-input-mask]")
      .forEach((el) => {
        if (el.dataset.maskInitialized) return
        el.dataset.maskInitialized = "true"
        masks.push({ el, mask: IMask(el, { mask: el.dataset.jsInputMask! }) })
      })

    return () =>
      masks.forEach(({ el, mask }) => {
        mask.destroy()
        delete el.dataset.maskInitialized
      })
  }, [])
}

export default useInputMaskRuntime
