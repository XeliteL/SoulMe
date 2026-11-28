"use client"

import { useState } from "react"
import classNames from "classnames"

import {
  ageRatingKeys,
  ageRatings,
  genreKeys,
  genreLabels,
  tagKeys,
  tagLabels,
  typeKeys,
  typeLabels,
} from "@/entities/anime"
import Button from "@/shared/ui/Button"
import Checkbox from "@/shared/ui/Checkbox"
import type { TriState } from "@/shared/ui/TristateCheckbox"

import { episodeRangeKeys, episodeRanges } from "../../config/episodeRanges"
import { statusKeys, statusOptions } from "../../config/statusOptions"
import { buildFilterHref } from "../../lib/buildFilterHref"
import type { Filter } from "../../model/filterSchema"
import FilterOptionsPanel from "./components/FilterOptionsPanel"
import Help from "./components/Help"
import PanelButton from "./components/PanelButton"
import RandomAnimeButton from "./components/RandomAnimeButton"
import RangeInput from "./components/RangeInput"
import { renderOptionInputs } from "./lib/renderOptionInputs"

import "./FilterForm.scss"

function createOptionStates<T extends string>(
  included: readonly T[] = [],
  excluded: readonly T[] = [],
): Partial<Record<T, TriState>> {
  const states: Partial<Record<T, TriState>> = {}

  for (const id of included) states[id] = "include"
  for (const id of excluded) states[id] = "exclude"

  return states
}

interface FilterFormProps {
  animeIds: string[]
  filter: Filter
}

const FilterForm = ({ animeIds, filter }: FilterFormProps) => {
  const maxYear = new Date().getFullYear() + 1
  const preservedKeys = ["view", "sort", "order", "search"] as const
  const [screen, setScreen] = useState<"main" | "genres" | "tags">("main")
  const [genreStates, setGenreStates] = useState(() =>
    createOptionStates(filter.genre, filter.excludeGenre),
  )
  const [tagStates, setTagStates] = useState(() =>
    createOptionStates(filter.tag, filter.excludeTag),
  )
  const [isGenreStrict, setIsGenreStrict] = useState(filter.match === "all")
  const [isTagStrict, setIsTagStrict] = useState(filter.tagMatch === "all")

  return (
    <form className="filter-form">
      {preservedKeys.map((name) => {
        const value = filter[name]

        return value === undefined ? null : (
          <input key={name} type="hidden" name={name} value={value} />
        )
      })}
      {renderOptionInputs(genreKeys, genreStates, {
        includeName: "genre",
        excludeName: "excludeGenre",
        matchName: "match",
        isStrict: isGenreStrict,
      })}
      {renderOptionInputs(tagKeys, tagStates, {
        includeName: "tag",
        excludeName: "excludeTag",
        matchName: "tagMatch",
        isStrict: isTagStrict,
      })}
      <div
        className={classNames("filter-form__main", {
          "filter-form__main--inactive": screen !== "main",
        })}
        inert={screen !== "main"}
      >
        <div className="filter-form__actions">
          <PanelButton label="Жанры" onClick={() => setScreen("genres")} />
          <PanelButton label="Теги" onClick={() => setScreen("tags")} />
          <fieldset className="filter-form__fieldset">
            <legend>
              <span className="filter-form__legend-content">Год релиза</span>
            </legend>
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
            <legend>
              <span className="filter-form__legend-content">Рейтинг</span>
            </legend>
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
            <legend>
              <span className="filter-form__legend-content">
                Количество рецензий
              </span>
            </legend>
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
            <legend>
              <span className="filter-form__legend-content">
                Длительность, мин
              </span>
            </legend>
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
            <legend>
              <span className="filter-form__legend-content">Тип</span>
            </legend>
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
            <legend>
              <span className="filter-form__legend-content">Статус</span>
            </legend>
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
                  {status === "recent" && (
                    <Help
                      label="Пояснение к статусу недавно"
                      variant="solo"
                      text="Аниме вышедшие за последние полгода"
                    />
                  )}
                </li>
              ))}
            </ul>
          </fieldset>
          <fieldset className="filter-form__fieldset">
            <legend>
              <span className="filter-form__legend-content">
                Количество серий
                <Help
                  label="Пояснение к количеству серий"
                  information={Object.values(episodeRanges)}
                />
              </span>
            </legend>
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
            <legend>
              <span className="filter-form__legend-content">
                Возрастной рейтинг
                <Help
                  label="Пояснение к возрастным рейтингам"
                  information={Object.values(ageRatings)}
                />
              </span>
            </legend>
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
      </div>
      {screen === "genres" && (
        <FilterOptionsPanel
          label="Жанры"
          options={genreKeys.map((id) => ({
            id,
            label: genreLabels[id],
            state: genreStates[id] ?? "none",
            setState: (state) =>
              setGenreStates((current) => ({ ...current, [id]: state })),
          }))}
          placeholder="жанрам"
          isStrict={isGenreStrict}
          onBack={() => setScreen("main")}
          onReset={() => setGenreStates({})}
          onStrictChange={setIsGenreStrict}
        />
      )}
      {screen === "tags" && (
        <FilterOptionsPanel
          label="Теги"
          options={tagKeys.map((id) => ({
            id,
            label: tagLabels[id],
            state: tagStates[id] ?? "none",
            setState: (state) =>
              setTagStates((current) => ({ ...current, [id]: state })),
          }))}
          placeholder="тегам"
          isStrict={isTagStrict}
          onBack={() => setScreen("main")}
          onReset={() => setTagStates({})}
          onStrictChange={setIsTagStrict}
        />
      )}
    </form>
  )
}

export default FilterForm
