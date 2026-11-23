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

### Extension props (required)

Every component forwards `className`, `ref` and a fixed set of extension props to its root element: `data-*`, `aria-*`, a string or number `id`, an object `style`, and `on[A-Z]*` event handlers that are functions. Nothing else is forwarded (not `title`, `role`, `tabIndex`, `lang` or `hidden`), because component props can come from untyped content data (WCM component configs, catalog items) with keys the component does not declare. Use the shared helpers (internal, not exported from the package entry):

```tsx
import { ExtendableProps, pickDomProps } from "../../utilities/extendable";
import { classNames } from "../../utilities/classNames";

const DXFoo = ( props: ExtendableProps<FooProps, "div"> ) => {
    // Own props are pulled out; pickDomProps keeps only the extension props from the rest
    const { title, items, className, ref, ...rest } = props;
    return <div {...pickDomProps( rest )} ref={ref} className={classNames( "dxFoo", className )} data-testid="foo">...</div>;
};
```

- Never spread raw `rest` on a DOM element or a wrapped component: always spread `pickDomProps( rest )`. `ExtendableProps` types exactly the same list.
- The filtered props come first, then `ref` and `className`, then the component's own attributes, so the component's own values win.
- A root that sets `style` merges the consumer's (`const domProps = pickDomProps( rest );` then `style={{ ...( domProps.style as React.CSSProperties | undefined ), ...ownStyle }}`). A root with its own event handler chains the consumer's (taken from the filtered props) with `chainHandlers`. A root that already has an internal ref merges it with `mergeRefs`.
- A component placed directly inside a carousel (react-slick) must be wrapped in `SlideSink`, because the carousel clones its children with `className`, `style` and `tabIndex`.
- Document branches that render no root (a fragment or `null`) in the component's JSDoc.
- No `forwardRef` and no prop renames.
- The test file must call `itSupportsExtensionProps( ( extra ) => <DXFoo {...props} {...extra} /> )` once (from `src/testUtils/extensionContract`). `src/components/extensionContract.test.ts` fails when an exported component is missing it. The helper also renders the component with undeclared, content-style keys (`WCM_STYLE_PROPS`) and fails if any of them reaches the root. When the component declares one of those keys as its own prop, list it in the `ownKeys` option with a comment.

## Coding Conventions

- **Functional components** with `React.FC<Props>` and TypeScript interfaces (components that forward `ref` use a plain function, as in the example above)
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
npm run lint:tokens # Check that every var(--token) used in src is defined
```

## Building

```bash
npm run build           # Library build (CJS, ESM, UMD via Rollup)
npm run build:storybook # Build Storybook static site
```

## Contributor License Agreement (CLA)

We require all contributors to sign a Contributor License Agreement (CLA) before we can accept contributions. When you open a pull request, the CLA Assistant bot will check whether you have signed. If the CLA check fails, you can sign the CLA here:

https://cla-assistant.io/HCL-TECH-SOFTWARE/dx-blueprint-react-components

You only need to sign the CLA once — it covers all future contributions to this repository.

## Pull Request Expectations

- All tests pass (`npm run test:unit`)
- Lint passes (`npm run lint`)
- CLA is signed (the CLA Assistant bot will verify this automatically)
- Clear, descriptive commit messages
- Work on a feature branch — never commit directly to `main`
- Keep PRs focused on a single change
