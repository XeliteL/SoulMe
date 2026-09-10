import Banner from "@/widgets/Banner"
import Categories from "@/widgets/Categories"
import Devices from "@/widgets/Devices"
import Hero from "@/widgets/Hero"
import Questions from "@/widgets/Questions"

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
      <Banner />
    </>
  )
}
