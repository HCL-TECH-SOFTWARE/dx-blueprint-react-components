# HCL DX Blueprint — Agent Guidelines

React 19 + TypeScript component library. Rollup builds CJS/ESM/UMD bundles. Storybook 10 for documentation.

## Commands

```bash
npm ci                  # Install
npm run dev             # Storybook dev server (port 6006)
npm run build           # Production library build (Rollup)
npm run build:storybook # Build Storybook static site
npm run test:unit       # Unit tests + coverage
npm run test:mutation   # Mutation testing (Stryker)
npm run lint            # ESLint check
npm run lint:fix        # ESLint auto-fix
```

## Structure

```
src/
├── components/     # DX* and CEC* families; barrel: index.ts
├── utilities/      # Shared helpers; barrel: index.ts
├── global/         # Global SCSS tokens
└── index.ts        # Library entry point
docs/               # Guide-level MDX (Storybook pages)
```

## Component Registration (two steps required)

1. `src/components/DXComponentName/index.ts` — `export { default } from "./DXComponentName";`
2. `src/components/index.ts` — `export { default as DXComponentName } from "./DXComponentName";`

Skipping step 2 silently breaks the published package.

## Thresholds

- **Coverage:** 90% (statements, branches, functions, lines)
- **Mutation:** high 80%, low 70%, break 65% (`stryker.config.json`)

## Console Log Validation

Unexpected `console.warn`/`console.error` in tests fails CI. Config: `.jest-reporter-log-validator-config.json`.

| Use case | Config key | Format |
|---|---|---|
| Test deliberately triggers the log | `logValidations` | `{ "patterns": ["<substring>"], "max": <count> }` |
| Non-deterministic / unfixable log | `exemptLogs` | `{ "patterns": ["<substring>"] }` |

## File Policy

- Temporary files → `./tmp/` (repo root only, gitignored). Never inside `src/`.

## Git Safety

- Never force-push or run destructive commands without explicit request
- Never commit directly to `main`
- Work on feature branches; if hooks fail, fix and create a new commit (do not amend)
