import classNames from "classnames"
import Link from "next/link"

import { animeItems, AnimePosterCard, AnimeRowCard } from "@/entities/anime"
import {
  applyFilter,
  applySort,
  buildFilterHref,
  DEFAULT_VIEW,
  getCollectionTitle,
  parseFilter,
  SortMenu,
  viewOptions,
  views,
} from "@/features/filter"
import Icon from "@/shared/ui/Icon"
import Section from "@/shared/ui/Section"

import "./FilterPage.scss"

const FilterPage = async ({ searchParams }: PageProps<"/anime/filter">) => {
  const filter = parseFilter(await searchParams)
  const items = applySort(applyFilter(animeItems, filter), filter)
  const title = getCollectionTitle(filter.collection) ?? "Каталог"
  const view = filter.view ?? DEFAULT_VIEW

  return (
    <div className="filter-page container">
      <Section
        titleAs="h1"
        title={title}
        className="filter-page__results"
        actions={
          <>
            <SortMenu filter={filter} />
            <nav className="filter-page__views" aria-label="Вид каталога">
              {views.map((option) => (
                <Link
                  className="filter-page__view"
                  href={buildFilterHref({ ...filter, view: option })}
                  aria-current={option === view ? "true" : undefined}
                  title={viewOptions[option].label}
                  scroll={false}
                  key={option}
                >
                  <Icon name={viewOptions[option].iconName} hasFill></Icon>
                  <span className="visually-hidden">
                    {viewOptions[option].label}
                  </span>
                </Link>
              ))}
            </nav>
          </>
        }
      >
        {items.length > 0 ? (
          <ul
            className={classNames(
              "filter-page__titles",
              `filter-page__titles--${view}`,
            )}
          >
            {items.map((anime) => (
              <li key={anime.id}>
                {view === "list" ? (
                  <AnimeRowCard {...anime} />
                ) : (
                  <AnimePosterCard {...anime} />
                )}
              </li>
            ))}
          </ul>
        ) : (
          <>Ничего не нашлось</>
        )}
      </Section>
      <section className="filter-page__settings"></section>
    </div>
  )
}

export default FilterPage
