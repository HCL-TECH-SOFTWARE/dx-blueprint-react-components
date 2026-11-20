# Architecture

## Overview

HCL DX Blueprint is a React 19 + TypeScript component library that ships as ESM, CJS, and UMD bundles plus separate CSS files via Rollup. It is consumed inside **HCL Digital Experience Portal** and **standalone SPAs**. Documentation is authored with Storybook 10.

## High-Level Diagram

```
┌─────────────────────────────────────────────────────────┐
│  Consumers (DX Portal, standalone SPAs)                 │
│  import { DXCard, CECNewsTile, ... } from '@blueprint…' │
└──────────────────────┬──────────────────────────────────┘
                       │
              published via npm registry
                       │
┌──────────────────────▼──────────────────────────────────┐
│  Library Entry Point  (src/index.ts)                    │
│  ├── re-exports src/components/*                        │
│  ├── re-exports src/utilities/*                         │
│  └── imports compat shims + coolicons (CSS, see below)  │
└──┬──────────────────────────────┬───────────────────────┘
   │                              │
   ▼                              ▼
┌──────────────┐    ┌──────────────────────────────┐
│  Components  │    │  Utilities                   │
│  DX* (70+)   │    │  links, buttons, icons,      │
│  CEC* (10+)  │    │  dates, html parsing,        │
│              │    │  navigation, charts, avatar  │
└──────┬───────┘    └──────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────┐
│  Foundation Layer                    │
│  src/styles/                         │
│  ├── tokens.css (default tokens)     │
│  └── _typography-helpers.scss        │
│  src/global/  (SCSS)                 │
│  ├── variables.scss  (z-index)       │
│  ├── breakpoints.scss (responsive)   │
│  └── _exportVariables.module.scss    │
│      (JS-accessible tokens)          │
└──────────────────────────────────────┘
```

## Component Families

### DX Components (`DX*`)

General-purpose portal UI components (70+). Examples: `DXHeroBanner`, `DXNavigationHeader`, `DXCard`, `DXMegaMenu`, `DXDataTable`.

### CEC Components (`CEC*`)

**Connections Engagement Center** components designed for HCL Connections integration with HCL Digital Experience. Examples: `CECNewsTile`, `CECEvent`, `CECPagination`. CEC components follow the same React patterns as DX components but consume Connections-specific data models (news items, events, categories) via dedicated types in `src/utilities/cec-types.ts` and helpers in `src/utilities/cec-utils.ts`.

## Build Pipeline

`rollup.config.js` exports a list of configs that Rollup runs in order. `dist/` is cleaned once before they run (skipped in watch mode).

```
src/index.ts
    │
    ▼  Rollup
┌──────────────────────────────────────────────────────────────┐
│  1. ESM    dist/esm/**   one file per module, deps external  │
│  2. CJS    dist/cjs/**   same, CommonJS  (package "main")    │
│  3. UMD    dist/umd/index.js  one file, deps bundled,        │
│            react/react-dom external, global name TRF         │
│  4. Types  dist/index.d.ts  (rollup-plugin-dts)              │
│  5. CSS    dist/css/tokens.css, components.css, bootstrap.css│
│            dist/{cjs,esm,umd}/index.css  (all-in-one)        │
│            dist/_assets/  (hashed fonts and images)          │
└──────────────────────────────────────────────────────────────┘
```

- **ESM and CJS** keep the source module layout (`preserveModules`, root `src`). Every name in `dependencies` and `peerDependencies` (including subpaths such as `react-bootstrap/Button`) stays an `import`/`require`, so the consumer's bundler resolves and tree-shakes it. `dist/esm/package.json` declares `sideEffects: ["**/*.css"]` (and deliberately no `"type": "module"`: webpack 5 would then reject the extensionless `react-bootstrap/*` deep imports). The root `package.json` declares the same `sideEffects`.
- **UMD** is a single self-contained file for `<script>` use. Only `react` and `react-dom` are external (globals `React`, `ReactDOM`).
- **No CSS in the JavaScript.** Stylesheet imports are replaced by an empty module in the JS builds. The exception is `*.module.scss`: its `:export` values (breakpoints, z-index levels) are compiled into a JS object.
- **CSS** is built in a separate pass over the same import graph (Bootstrap excluded) into `components.css`, then `tokens.css` and Bootstrap's CSS are copied alongside. The `index.css` files are `tokens.css`, Bootstrap, then `components.css`, concatenated, with one `@charset` at the top. Fonts and images referenced by CSS are copied to `dist/_assets/` under a content hash and referenced as `../_assets/<hash>.<ext>`.
- **`exports`** in `package.json` publishes `.` (with `types`, `import`, `require`), `./tokens.css`, `./components.css`, `./bootstrap.css`, `./index.css`, the existing `dist/*/index.css` and `dist/umd/index.js` paths, and `./package.json`. There is no wildcard entry, so internals stay private.
- Plugins: `@rollup/plugin-node-resolve`, `@rollup/plugin-commonjs`, `@rollup/plugin-typescript`, `rollup-plugin-postcss` (SCSS), `rollup-plugin-dts`, `@rollup/plugin-image`, `@rollup/plugin-json`, and `postcss-url` for asset hashing.

**TypeScript** compiles to ES5 with ESNext modules (Rollup handles final bundling). Strict mode is enabled. Declaration files are emitted separately and bundled by `rollup-plugin-dts`.

## UI Foundations

### react-bootstrap

Used as a layout and form foundation (`Container`, `Row`, `Col`, `Form`). Will remain as the supplementary UI layer.

### Styling

- **SCSS** with BEM naming, `dx` prefix, and camelCase: `dxHeroBanner__bodyButton--state-active`
- **Design tokens** in `src/styles/tokens.css`: default colors, typography scales and component hooks as CSS custom properties, declared under `:where(:root)` so any consumer `:root` rule overrides them. No font files or `@font-face` rules ship; the font tokens name Noto Sans with system fallbacks. `npm run lint:tokens` fails when a `var(--token)` used in `src` is defined nowhere
- **SCSS globals** in `src/global/`: z-index levels (10–110), responsive breakpoints (375px–1200px)
- **No CSS-in-JS** — all styles are compiled SCSS
- **JS-accessible tokens** via `_exportVariables.module.scss` for breakpoint/z-index values in component logic
- **`!important` is prohibited** — the library must remain overridable by consumers. The only exceptions are declarations that must outrank an inline style written by something else (the Popper tooltip arrow in `DXNewsletterBanner`, react-slick in `DXScrollableCard`, author HTML in the `CECNewsDialog` body); each carries a `// keep !important` comment

### Responsive Breakpoints

| Token | Size | Target |
|-------|------|--------|
| `xs` | 375px | Smartphones |
| `sm` | 576px | Large phones / small tablets |
| `md` | 768px | Tablets (portrait) |
| `lg` | 992px | Small desktops |
| `xl` | 1200px | Large desktops |

SCSS mixins: `@include mobile`, `@include xs`, `@include sm`, `@include md`, `@include lg`, `@include xl`.

## Component Anatomy

Every component follows the same file structure:

```
DXComponentName/
├── DXComponentName.tsx         # Implementation
├── DXComponentName.test.tsx    # Unit tests (Jest + RTL)
├── DXComponentName.stories.tsx # Storybook stories
├── DXComponentName.scss        # BEM-scoped styles
└── index.ts                    # Barrel: export { default } from "./DXComponentName"
```

### Common Patterns

- **Functional components** with TypeScript interfaces (`React.FC<Props>`, or a plain function when the component takes `ref`)
- **Extension props**: every component accepts `className`, extra HTML attributes and `ref` on its root via `ExtendableProps<Props, "el">` (`src/utilities/extendable.ts`) and `classNames` (`src/utilities/classNames.ts`); own attributes win, consumer event handlers run first, internal refs are merged with `mergeRefs`. Index-signature props types forward only DOM-safe extras (`pickDomProps`). These helpers are internal and not exported from the package entry.
- **Component-local state** via `useState` / `useReducer` — no global state management (no Redux, no Context providers)
- **Custom hooks** for shared behavior (e.g. `useOutsideAlerter` for click-outside detection)
- **Typed prop interfaces** with optional fields and discriminated unions for variants
- **Nested composition** via typed props (`nestedComponent: NestedComponentProps`), never markup duplication
- **`data-testid`** attributes on key DOM elements for test selectors
- **Accessibility-first**: ARIA attributes, semantic HTML, keyboard event handling (Enter/Space), focus management

### Complexity Spectrum

| Tier | Example | Characteristics |
|------|---------|-----------------|
| Simple | `DXButton`, `DXCard` | Stateless or single `useState`, delegates to react-bootstrap |
| Medium | `CECNewsTile`, `DXAccordion` | Multiple display modes (type unions), data fallback logic, HTML sanitization |
| Complex | `DXMegaMenu`, `DXDataTable`, `DXFullCalendar` | Multi-level state, recursive data structures, portal rendering, custom hooks, dynamic layout calculation |

## Shared Utilities (`src/utilities/`)

| Module | Purpose |
|--------|---------|
| `links.tsx` | Link target resolution, anchor generation, link icons |
| `button.tsx` | `ButtonProps`, `IconButtonProps` types and helpers |
| `image.tsx` | `ImageProps`, `GalleryImageProps` |
| `htmlparser.tsx` | HTML sanitization (`DOMPurify`), content parsing |
| `date.tsx` | Date format parsing, month names, weekday helpers |
| `dateTime.ts` | Internal (not exported) English date parsing, formatting and calendar arithmetic on the native `Date` |
| `icons.tsx` | Icon resolution (`getIcon`, `StateIcons`, `SliderIcons`) |
| `navigation.tsx` | Overlay management, click-outside alerter |
| `chart.tsx` | Chart/graph data structures (D3-backed) |
| `avatar.tsx` | Avatar letter rendering, project member avatars |
| `text.tsx` | Text overflow / clamping |
| `video.tsx` | Video format detection |
| `catalog.tsx` | Column layout calculation |
| `tags.tsx` | Tag component types |
| `cec-types.ts` | CEC-specific: `NewsItemProps`, date formats, categories |
| `cec-utils.ts` | CEC-specific: HTML entity decoding, image extraction, smart dates |
| `BasicComponent/` | Base class providing edit-mode support |
| `CardComponent/` | Card layout utility wrapper |

## Testing Architecture

### Unit Tests (Jest + React Testing Library)

- **Environment:** jsdom
- **Coverage threshold:** 90% (statements 92%, branches 89%, functions 89%, lines 93%)
- **Module mocking:** CSS/SCSS → `identity-obj-proxy`; SVG → `jest-svg-transformer`
- **Setup:** `src/setupTests.js` polyfills `matchMedia`, `ResizeObserver`, `scrollTo`
- **Extension contract:** each component's test calls `itSupportsExtensionProps` (`src/testUtils/extensionContract.tsx`: merged `className`, DOM attributes, `ref` on the root, no console errors); `src/components/extensionContract.test.ts` fails if an exported component lacks the call
- **Console enforcement:** `jest-reporter-log-validator` fails tests with unexpected `console.warn` / `console.error`
- **Reports:** HTML (`test-report/Nex_Haven.html`), JUnit XML (`test-report/Nex_Haven.xml`)

### Mutation Testing (Stryker)

- **Targets:** `src/components/**/*.tsx` (excludes tests, stories, index files)
- **Thresholds:** high 80%, low 70%, break (CI fail) 65%
- **Incremental mode** caches results in `src/__tests__/mutation/stryker-incremental.json`
- **Runner:** Jest, 8 workers, 60s timeout per mutant

### Visual Snapshot Tests

Visual snapshot testing infrastructure was removed during the open-source preparation. Component visual regression can be verified through Storybook's built-in interaction and visual testing capabilities.

## CI/CD (GitHub Actions)

```
┌─────────────────────────────────────────┐
│  ci.yml (on: push to main / PR)         │
│  ├── npm ci                             │
│  ├── npm run lint                       │
│  ├── npm run lint:tokens                │
│  ├── npm run build:lib (library build)  │
│  ├── npm run test:unit --coverage       │
│  └── npm run test:mutation              │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  docs.yml (on: push to main)            │
│  ├── npm ci                             │
│  ├── npm run build:storybook            │
│  └── deploy → GitHub Pages (gh-pages)   │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  release.yml (on: workflow_dispatch)    │
│  ├── npm ci                             │
│  ├── npm run lint                       │
│  ├── npm run build:lib                  │
│  ├── npm run test:unit --coverage       │
│  ├── npm version (set version)          │
│  ├── npm publish → npm registry         │
│  └── git tag + push                     │
└─────────────────────────────────────────┘
```

## Security

- **HTML sanitization:** `DOMPurify` used in `htmlparser.tsx` for any user-provided or CMS content rendered via `dangerouslySetInnerHTML`

## Storybook Documentation

```
docs/
├── overview/                  # Introduction, principles, changelog
├── how-to/                    # Get started, install, configure, customize
├── information-architecture/  # Portal structure guidance
├── foundations/               # Design tokens, typography, colors
├── assets/                    # Static assets for documentation
└── blocks/                    # Reusable MDX fragments (not displayed as stories)
```

Story sort order: **Overview → How To → Information Architecture → Foundations → Components**.

Storybook addons: docs, links, SCSS support, MDX GFM.

## Key Dependencies

| Package | Role |
|---------|------|
| `react` / `react-dom` 19 | Core framework (external — not bundled) |
| `react-bootstrap` | Layout and form components |
| `d3` | Data visualization (charts, tree maps) |
| `dompurify` | HTML sanitization |
| `react-data-table-component` | `DXDataTable` (injects its own stylesheet when imported) |
