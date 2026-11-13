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

### Changed

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
