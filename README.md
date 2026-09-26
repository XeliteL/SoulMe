# SoulMe

SoulMe is the landing page for an anime streaming service — browse a catalog of anime titles with Russian dub and subtitles, track new episodes, and build a personal watchlist.

## Design

The UI was designed by me — see the [Figma mockup](https://www.figma.com/design/dB7bfwAFQuN67Vu3DT4GZ3/SoulMe?node-id=34-3).

## Tech stack

- [minista](https://minista.jp) — a Vite-based static site generator with file-based routing
- React 18 + TypeScript
- SCSS (BEM naming)
- ESLint (typescript-eslint), Stylelint, Prettier
- Vitest + React Testing Library

## Getting started

```bash
npm install
npm run start     # dev server
```

## Scripts

| Command              | Description                                     |
| --------------------- | ------------------------------------------------ |
| `npm run start`       | Start the dev server                              |
| `npm run build`       | Build for production                              |
| `npm run preview`     | Preview the production build                      |
| `npm run check`       | Run format check + lint + stylelint + tests       |
| `npm run fix`         | Auto-fix formatting, lint, and stylelint issues    |
| `npm run test`        | Run the test suite                                |
| `npm run test:watch`  | Run tests in watch mode                           |

## Project structure

```
src/
  app/styles/   — global SCSS (helpers, mixins, variables)
  layouts/      — page wrapper (Header + Content + Footer), <head> metadata
  pages/        — file-based routing (minista), one page per file
  widgets/      — large page sections (Header, Footer, Hero, Categories, Devices, ...)
  shared/
    ui/         — reusable UI primitives (Button, Icon, Logo, Slider, ...)
    config/     — cross-cutting config (navigation)
    assets/     — icons, fonts, images
```

## License

[MIT](LICENSE)
