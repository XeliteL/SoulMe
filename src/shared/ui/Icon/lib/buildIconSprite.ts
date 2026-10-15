import fs from "node:fs"
import path from "node:path"

import { ICON_NAMES } from "../config/iconName"

const ICONS_DIR = path.join(process.cwd(), "src/shared/assets/icons")

const COLOR_ATTRIBUTES = /\s(?:fill|stroke)="[^"]*"/g

export const toSymbol = (name: string, svg: string) => {
  const viewBox = svg.match(/viewBox="([^"]*)"/)?.[1]
  const content = svg
    .replace(/^[\s\S]*?<svg[^>]*>|<\/svg>\s*$/g, "")
    .replace(COLOR_ATTRIBUTES, "")
    .trim()

  return `<symbol id="${name}" viewBox="${viewBox}">${content}</symbol>`
}

export const buildIconSprite = () => {
  const symbols = ICON_NAMES.map((name) =>
    toSymbol(
      name,
      fs.readFileSync(path.join(ICONS_DIR, `${name}.svg`), "utf8"),
    ),
  )

  return `<svg xmlns="http://www.w3.org/2000/svg">${symbols.join("")}</svg>`
}
