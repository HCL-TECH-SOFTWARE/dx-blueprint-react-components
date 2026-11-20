# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## Unreleased

### Added

- Default design tokens in `src/styles/tokens.css` (declared under `:where(:root)`, so consumer overrides always win), published as `tokens.css`.
- Separate stylesheets: `tokens.css`, `components.css` and `bootstrap.css`, plus `index.css` (all-in-one). `dist/{cjs,esm,umd}/index.css` are still produced.
- `exports` map in `package.json` (no wildcard; the existing `dist/cjs/index.css` and `dist/umd/*` paths stay reachable) and `sideEffects: ["**/*.css", "**/*.scss"]` (`.scss` is listed so Storybook, which imports component styles from source, keeps them).
- Typography helper classes `._10-regular`, `._10-semibold`, `._18-semibold` and `._32-regular` are now part of the built CSS.
- `npm run lint:tokens`, run in CI, fails when a `var(--token)` used in `src` is not defined.
- Every component accepts `className`, extra HTML attributes (`data-*`, `aria-*`, `id`, event handlers, ...) and `ref` on its root element. `className` is added to the component's own classes, the component's own attributes win over yours, and your event handlers run first. Components with an index-signature props type only forward DOM-safe extras. See "Extending components" in the README.

### Changed

- Removed the `moment`, `axios`, `styled-components` and `@emotion/is-prop-valid` dependencies. Dates are handled by an internal English-only helper on the native `Date` (same output for ISO input) and `DXVideo` requests its playlists with `fetch`.
- `DXCalendar` passes the original event object to `_selectEvent`; its `date` is the string you supplied, where it used to be a copy holding a `moment` object.
- `DXEventItem` builds its weekday label from the parsed `dateFormat` parts. The result is unchanged for common formats, correct for four-digit years and month-name formats (it was wrong or "Invalid date"), and shows "Invalid date" for compact two-digit-year formats such as `YYMMDD`, whose day number was already wrong.
- Upgraded `react-data-table-component` from 7.5.3 to 8.12.0. `DXDataTable` looks the same apart from the pagination controls (a bordered "Rows per page" box and lighter arrows) and a thinner row expander icon. v8 adds its stylesheet to the page when the package is imported and has no CSP nonce option, so a strict `style-src` policy blocks the table styles.
- Removed `!important` from the component styles so consumer CSS can override them. Four declarations keep it because they must outrank an inline style set by Popper (the `DXNewsletterBanner` tooltip arrow), react-slick (`DXScrollableCard`) or content authors (images in the `CECNewsDialog` body); each has a comment.
- The news dialog styles live in one place (`CECNewsDialog`). When the combined `components.css` is used together with `CECMegaNews` the dialog now has the standalone dialog look (smaller title, different header padding) and shows its lead image.
- ESM and CJS builds keep one file per module and import their dependencies instead of inlining them, so bundlers can tree-shake. In a local webpack 5 and esbuild test, importing only `DXButton` went from about 700 KB to about 5 KB minified.
- The JavaScript no longer imports any CSS. Import `tokens.css` and `components.css` (and optionally `bootstrap.css`), or the all-in-one `index.css`.
- Bootstrap's CSS is only included if you import `bootstrap.css` or `index.css`.
- Where a stylesheet referenced a token that was not defined anywhere, it now uses the matching defined token, so a few components render with the palette value instead of the browser default or hard-coded fallback.
- `components.css` is minified (the previous single CSS file was not), and the all-in-one `index.css` starts with a single `@charset`.
- Dependency versions are resolved by the consumer's package manager and are no longer baked into the ESM and CJS output. The UMD build stays fully bundled and keeps the `TRF` global.
- Importing the package from plain Node without a bundler (plain Node ESM) is not supported; use a bundler.

### Fixed

- Undefined CSS custom property references across component styles (see `npm run lint:tokens`).
- The bootstrap-icons font URL in the built CSS pointed at a file that was never shipped; it now points at a hashed file in `dist/_assets`.
- Two components hard-coded a font family that is not shipped with the package; they now use the typography tokens.

## 1.0.0

Initial public release of the HCL DX Blueprint React component library.
