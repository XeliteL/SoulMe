import Categories from "@/sections/Categories"
import Devices from "@/sections/Devices"
import Hero from "@/sections/Hero"
import Questions from "@/sections/Questions"

export const metadata = {
  title: "Главная",
  isHeaderFixed: true,
}

export default function () {
  return (
    <>
      <Hero />
      <Categories />
      <Devices />
      <Questions />
    </>
  )
}
