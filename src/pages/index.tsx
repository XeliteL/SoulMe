import Categories from "@/widgets/Categories"
import Hero from "@/widgets/Hero"

export const metadata = {
  title: "Главная",
  isHeaderFixed: true,
}

export default function () {
  return (
    <>
      <Hero></Hero>
      <Categories></Categories>
      <h2 id="faq">FAQ</h2>
      <h2 id="subscription">Подписка</h2>
    </>
  )
}
