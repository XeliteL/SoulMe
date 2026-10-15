# SoulMe

SoulMe is the landing page for an anime streaming service — browse a catalog of anime titles with Russian dub and subtitles, track new episodes, and build a personal watchlist.

## Design

The UI was designed by me — see the [Figma mockup](https://www.figma.com/design/dB7bfwAFQuN67Vu3DT4GZ3/SoulMe?node-id=34-3).

## Tech stack

- [Next.js](https://nextjs.org) (App Router)
- React 19 + TypeScript
- SCSS (BEM naming)
- ESLint (typescript-eslint), Stylelint, Prettier
- Vitest + React Testing Library

## Getting started

```bash
npm install
npm run dev       # dev server
```

## Scripts

| Command              | Description                                     |
| --------------------- | ------------------------------------------------ |
| `npm run dev`         | Start the dev server                              |
| `npm run build`       | Build for production                              |
| `npm run start`       | Serve the production build                        |
| `npm run check`       | Run format check + lint + stylelint + tests       |
| `npm run fix`         | Auto-fix formatting, lint, and stylelint issues    |
| `npm run test`        | Run the test suite                                |
| `npm run test:watch`  | Run tests in watch mode                           |

## Project structure

```
app/            — Next.js App Router: layouts, one folder per route, metadata
src/            — Feature-Sliced Design
  views/        — pages: one slice per page, composes its own blocks (FSD `pages`,
                  renamed because Next.js reserves `pages`)
  widgets/      — blocks shared between pages (Header, Footer, Questions, LegalDocument)
  features/     — user actions (bookmarks, search, auth) — added as they appear
  entities/     — domain entities with types, data and cards (anime, category, session)
  shared/
    ui/         — reusable UI primitives (Button, Icon, Logo, Slider, ...)
    lib/        — hooks and helpers (formatters, ids)
    styles/     — global SCSS (helpers, mixins, variables)
    config/     — cross-cutting config (navigation)
    assets/     — icons, fonts, images
```

## License

[MIT](LICENSE)
