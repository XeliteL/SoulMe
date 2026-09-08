import Categories from "@/widgets/Categories"
import Devices from "@/widgets/Devices"
import Hero from "@/widgets/Hero"

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
      <h2 id="faq">FAQ</h2>
      <h2 id="subscription">Подписка</h2>
    </>
  )
}
