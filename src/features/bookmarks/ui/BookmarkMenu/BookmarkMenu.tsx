"use client"

import { useId } from "react"
import classNames from "classnames"

import Icon from "@/shared/ui/Icon"

import {
  bookmarkView,
  bookmarkViewKeys,
  getBookmarkView,
  toBookmark,
} from "../../model/bookmarks"
import { useBookmarkMenu } from "./lib/useBookmarkMenu"

import "./BookmarkMenu.scss"

interface BookmarkMenuProps {
  className?: string
  animeId: string
}

const BookmarkMenu = ({ className }: BookmarkMenuProps) => {
  const panelId = useId()
  const {
    rootRef,
    buttonRef,
    dropdownRef,
    isExpanded,
    toggle,
    handleKeyDown,
    handlePanelClick,
    bookmark,
    setBookmark,
    handleMainClick,
  } = useBookmarkMenu()

  const currentView = bookmark && getBookmarkView(bookmark)
  const main = currentView
    ? bookmarkView[currentView]
    : { label: "Добавить в закладки", iconName: "plus" as const }

  return (
    <div
      className={classNames(className, "bookmark-menu")}
      ref={rootRef}
      onKeyDown={handleKeyDown}
    >
      <div className="bookmark-menu__buttons">
        <button
          className="bookmark-menu__main"
          type="button"
          onClick={handleMainClick}
        >
          <Icon name={main.iconName} />
          {main.label}
        </button>
        <button
          className="bookmark-menu__toggle"
          type="button"
          aria-label="Выбрать папку"
          aria-expanded={isExpanded}
          aria-controls={panelId}
          ref={buttonRef}
          onClick={toggle}
        >
          <Icon name="chevron-down" hasFill />
        </button>
      </div>
      <div
        className={classNames("bookmark-menu__panel", {
          "is-expanded": isExpanded,
        })}
        id={panelId}
        ref={dropdownRef}
        onClick={handlePanelClick}
      >
        <ul className="bookmark-menu__list">
          {bookmarkViewKeys.map((view) => (
            <li key={view}>
              <button
                className="bookmark-menu__item"
                type="button"
                aria-current={view === currentView ? "true" : undefined}
                onClick={() => setBookmark(toBookmark(view))}
              >
                <Icon name={bookmarkView[view].iconName} />
                {bookmarkView[view].label}
              </button>
            </li>
          ))}
        </ul>
        {bookmark && (
          <button
            className="bookmark-menu__remove"
            type="button"
            onClick={() => setBookmark(null)}
          >
            Удалить из закладок
          </button>
        )}
      </div>
    </div>
  )
}

export default BookmarkMenu
