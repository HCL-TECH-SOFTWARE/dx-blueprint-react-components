# Contributing to HCL DX Blueprint

Thank you for your interest in contributing! This guide covers everything you need to get started.

## Prerequisites

- [Node.js](https://nodejs.org/) 24.x
- npm 11.10.0+

## Setup

```bash
npm ci              # Install dependencies
npm run dev         # Start Storybook dev server (port 6006)
```

## Project Structure

```
src/
├── components/     # DX* and CEC* component families
├── utilities/      # Shared helpers (links, buttons, icons, dates…)
├── global/         # Global SCSS tokens and compatibility shims
└── index.ts        # Library entry point
docs/               # Guide-level MDX documentation (Storybook pages)
```

## Creating a Component

Every component follows this file structure:

```
src/components/DXComponentName/
├── DXComponentName.tsx         # Implementation
├── DXComponentName.test.tsx    # Unit tests (Jest + React Testing Library)
├── DXComponentName.stories.tsx # Storybook stories
├── DXComponentName.scss        # BEM-scoped styles
└── index.ts                    # Barrel export
```

### Two-Step Registration

Both steps are required — skipping step 2 silently breaks the published package:

1. **Component barrel** — `src/components/DXComponentName/index.ts`:
   ```ts
   export { default } from "./DXComponentName";
   ```

2. **Library barrel** — add to `src/components/index.ts`:
   ```ts
   export { default as DXComponentName } from "./DXComponentName";
   ```

## Coding Conventions

- **Functional components** with `React.FC<Props>` and TypeScript interfaces
- **BEM naming** with `dx` prefix and camelCase: `dxHeroBanner__bodyButton--state-active`
- **SCSS scoped** inside the root class — no global styles, no `!important`
- **Reuse** existing utilities in `src/utilities/` rather than duplicating logic
- **No CSS-in-JS** for new components — all styles are compiled SCSS

## Testing

```bash
npm run test:unit       # Unit tests (90% coverage threshold required)
npm run test:mutation   # Mutation testing (thresholds in stryker.config.json)
```

### Coverage Threshold

The project enforces **90%** coverage across statements, branches, functions, and lines.

### Console Log Validation

Any unexpected `console.warn` or `console.error` during tests will fail CI. Allowed log messages are declared in `.jest-reporter-log-validator-config.json`.

- **Intentional logs** (test asserts on them): add to `logValidations` with a `max` count
- **Non-deterministic logs** (cannot be fixed now): add to `exemptLogs` as an escape hatch

## Linting

```bash
npm run lint        # Check for errors (must pass with 0 errors)
npm run lint:fix    # Auto-fix what can be fixed
```

## Building

```bash
npm run build           # Library build (CJS, ESM, UMD via Rollup)
npm run build:storybook # Build Storybook static site
```

## Pull Request Expectations

- All tests pass (`npm run test:unit`)
- Lint passes (`npm run lint`)
- Clear, descriptive commit messages
- Work on a feature branch — never commit directly to `main` or `develop`
- Keep PRs focused on a single change
