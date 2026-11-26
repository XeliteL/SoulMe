import {
  ageRatingKeys,
  ageRatings,
  typeKeys,
  typeLabels,
} from "@/entities/anime"
import Button from "@/shared/ui/Button"
import Checkbox from "@/shared/ui/Checkbox"

import { episodeRangeKeys, episodeRanges } from "../../config/episodeRanges"
import { statusKeys, statusOptions } from "../../config/statusOptions"
import { buildFilterHref } from "../../lib/buildFilterHref"
import type { Filter } from "../../model/filterSchema"
import RandomAnimeButton from "./components/RandomAnimeButton"
import RangeInput from "./components/RangeInput"

import "./FilterForm.scss"

interface FilterFormProps {
  animeIds: string[]
  filter: Filter
}

const FilterForm = ({ animeIds, filter }: FilterFormProps) => {
  const maxYear = new Date().getFullYear() + 1
  const preservedKeys = ["view", "sort", "order", "search"] as const

  return (
    <form className="filter-form">
      {preservedKeys.map((name) => {
        const value = filter[name]

        return value === undefined ? null : (
          <input key={name} type="hidden" name={name} value={value} />
        )
      })}
      <div className="filter-form__actions">
        <fieldset className="filter-form__fieldset">
          <legend>Год релиза</legend>
          <div className="filter-form__fieldset-range">
            <RangeInput
              className="filter-form__fieldset-input"
              name="yearFrom"
              ariaLabel="Год от"
              defaultValue={filter.yearFrom}
              min={1959}
              max={maxYear}
              placeholder="От"
            />
            <span aria-hidden="true"> — </span>
            <RangeInput
              className="filter-form__fieldset-input"
              name="yearTo"
              ariaLabel="Год до"
              defaultValue={filter.yearTo}
              min={1959}
              max={maxYear}
              placeholder="До"
            />
          </div>
        </fieldset>
        <fieldset className="filter-form__fieldset">
          <legend>Рейтинг</legend>
          <div className="filter-form__fieldset-range">
            <RangeInput
              className="filter-form__fieldset-input"
              name="ratingFrom"
              ariaLabel="Рейтинг от"
              defaultValue={filter.ratingFrom}
              min={0}
              max={10}
              step={0.01}
              stepCount={10}
              placeholder="От"
            />
            <span aria-hidden="true"> — </span>
            <RangeInput
              className="filter-form__fieldset-input"
              name="ratingTo"
              ariaLabel="Рейтинг до"
              defaultValue={filter.ratingTo}
              min={0}
              max={10}
              step={0.01}
              stepCount={10}
              placeholder="До"
            />
          </div>
        </fieldset>
        <fieldset className="filter-form__fieldset">
          <legend>Количество рецензий</legend>
          <div className="filter-form__fieldset-range">
            <RangeInput
              className="filter-form__fieldset-input"
              name="reviewsFrom"
              ariaLabel="Количество рецензий от"
              defaultValue={filter.reviewsFrom}
              min={0}
              placeholder="От"
            />
            <span aria-hidden="true"> — </span>
            <RangeInput
              className="filter-form__fieldset-input"
              name="reviewsTo"
              ariaLabel="Количество рецензий до"
              defaultValue={filter.reviewsTo}
              min={0}
              placeholder="До"
            />
          </div>
        </fieldset>
        <fieldset className="filter-form__fieldset">
          <legend>Длительность, мин</legend>
          <div className="filter-form__fieldset-range">
            <RangeInput
              className="filter-form__fieldset-input"
              name="durationFrom"
              ariaLabel="Длительность от, в минутах"
              defaultValue={filter.durationFrom}
              min={1}
              placeholder="От"
            />
            <span aria-hidden="true"> — </span>
            <RangeInput
              className="filter-form__fieldset-input"
              name="durationTo"
              ariaLabel="Длительность до, в минутах"
              defaultValue={filter.durationTo}
              min={1}
              placeholder="До"
            />
          </div>
        </fieldset>
        <fieldset className="filter-form__fieldset">
          <legend>Тип</legend>
          <ul
            className="filter-form__fieldset-list"
            style={{
              gridTemplateRows: `repeat(${Math.ceil(typeKeys.length / 2)}, auto)`,
            }}
          >
            {typeKeys.map((type) => (
              <li className="filter-form__fieldset-item" key={type}>
                <Checkbox
                  label={typeLabels[type]}
                  name="type"
                  value={type}
                  defaultChecked={filter.type?.includes(type)}
                />
              </li>
            ))}
          </ul>
        </fieldset>
        <fieldset className="filter-form__fieldset">
          <legend>Статус</legend>
          <ul
            className="filter-form__fieldset-list"
            style={{
              gridTemplateRows: `repeat(${Math.ceil(statusKeys.length / 2)}, auto)`,
            }}
          >
            {statusKeys.map((status) => (
              <li className="filter-form__fieldset-item" key={status}>
                <Checkbox
                  label={statusOptions[status]}
                  name="status"
                  value={status}
                  defaultChecked={filter.status?.includes(status)}
                />
              </li>
            ))}
          </ul>
        </fieldset>
        <fieldset className="filter-form__fieldset">
          <legend>Количество серий</legend>
          <ul
            className="filter-form__fieldset-list"
            style={{
              gridTemplateRows: `repeat(${Math.ceil(episodeRangeKeys.length / 2)}, auto)`,
            }}
          >
            {episodeRangeKeys.map((episode) => (
              <li className="filter-form__fieldset-item" key={episode}>
                <Checkbox
                  label={episodeRanges[episode].label}
                  name="episodes"
                  value={episode}
                  defaultChecked={filter.episodes?.includes(episode)}
                />
              </li>
            ))}
          </ul>
        </fieldset>
        <fieldset className="filter-form__fieldset">
          <legend>Возрастной рейтинг</legend>
          <ul
            className="filter-form__fieldset-list"
            style={{
              gridTemplateRows: `repeat(${Math.ceil(ageRatingKeys.length / 2)}, auto)`,
            }}
          >
            {ageRatingKeys.map((age) => (
              <li className="filter-form__fieldset-item" key={age}>
                <Checkbox
                  label={ageRatings[age].label}
                  name="age"
                  value={age}
                  defaultChecked={filter.age?.includes(age)}
                />
              </li>
            ))}
          </ul>
        </fieldset>
      </div>
      <div className="filter-form__button-container">
        <Button
          className="filter-form__button"
          href={buildFilterHref({
            view: filter.view,
            sort: filter.sort,
            order: filter.order,
          })}
          variant="black-06"
          label="Сбросить"
        />
        <Button
          className="filter-form__button"
          label="Применить"
          type="submit"
        />
        <RandomAnimeButton
          className="filter-form__button"
          animeIds={animeIds}
        />
      </div>
    </form>
  )
}

export default FilterForm
