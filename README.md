# HCL DX Blueprint — React Component Library

A React 19 + TypeScript component library for [HCL Digital Experience](https://www.hcltechsw.com/dx). Blueprint provides 100+ production-ready, accessible UI components that can be assembled into portal sites and standalone SPAs.

## Installation

```bash
npm install @hcl-software/dx-blueprint-react-components
```

React and React-DOM 19 are peer dependencies — the library does not bundle them. The other runtime dependencies (`react-bootstrap`, `d3`, ...) are installed with the package and imported by your bundler, so unused components can be tree-shaken.

## Quick Start

The JavaScript does not import any CSS. Import the stylesheets you want once, in your app entry:

```tsx
import "@hcl-software/dx-blueprint-react-components/tokens.css";
import "@hcl-software/dx-blueprint-react-components/components.css";
// Needed by the components built on react-bootstrap (for example DXPagination, DXDirectoryCard,
// DXChartCard); without it their layout breaks. Skip it only if you bring your own Bootstrap 5 CSS
// or use none of those components. See "Bootstrap is opt-in" below.
// import "@hcl-software/dx-blueprint-react-components/bootstrap.css";
import { DXCard, DXButton } from "@hcl-software/dx-blueprint-react-components";

function App() {
  return (
    <>
      <DXCard
        title={{ url: "#", label: "Welcome" }}
        description="A card with a link title and a button."
        primaryButton={{ label: "Get Started", onClick: () => {} }}
      />
      <DXButton label="Get Started" displayType="primary" onClick={() => {}} />
    </>
  );
}
```

## Extending components

Every component accepts a fixed set of extension props and applies them to its root element: `className`, `ref`, `id`, `style`, `data-*` and `aria-*` attributes, and event handlers (`onClick`, `onKeyDown`, ...):

```tsx
import { useRef } from "react";
import { DXCard } from "@hcl-software/dx-blueprint-react-components";

function Example() {
  const cardRef = useRef<HTMLDivElement>(null);
  return (
    <DXCard
      ref={cardRef}
      className="my-card"
      data-analytics="welcome-card"
      aria-describedby="welcome-help"
      title={{ url: "#", label: "Welcome" }}
    />
  );
}
```

- **`className`** is added after the component's own classes; none of the component's classes are removed.
- **Attributes**: `data-*`, `aria-*`, `id` (a string or a number) and `style` (an object) are passed to the root element. Attributes the component sets itself (for example a generated `id` that its styles depend on, or a `role`) win over yours. A `style` you pass is merged with the component's own inline styles, and the component's win on a clash.
- **Nothing else reaches the root.** Other attributes, for example `title`, `role`, `tabIndex`, `lang` or `hidden`, are not forwarded (unless the component declares them as its own props), and TypeScript rejects them. Component props can come from untyped content data, where such keys are content (a `title` text, a person's `role`), so they cannot be told apart from an attribute. If you really need one of them on the root, set it through the `ref`.
- An `aria-label` on a root that has no `role` (most roots are a plain `div`) is not announced by screen readers. This is standard ARIA behaviour; label an element that has a role instead.
- **Event handlers** you put on the root run before the component's own handler for the same event. Call `event.preventDefault()` to stop the component's handler.
- **`ref`** points at the root DOM element (React 19, no `forwardRef` needed). `DXButton` also keeps its existing `reactRef` prop; when both are given, `ref` wins.
- The same list applies to every component, including those whose props type accepts arbitrary keys, so unknown props never reach the DOM. An event handler is only forwarded when it is a function, and a `style` only when it is an object.
- Some components render nothing in a few states, so there is no root to receive `className`, `ref` or attributes: `DXQuickLinks` without links, `DXEventItem` with an unknown `variant`, `CECPagination` with `showPagination={false}`, and `DXHalfParallax` without slides (it renders a message paragraph). Components that open a modal (`DXModalWindows`, `DXCalendar`) apply them to their wrapper, not to the modal, which is rendered in a portal.

## Styling

### CSS files

| Import | Contents |
|--------|----------|
| `@hcl-software/dx-blueprint-react-components/tokens.css` | Default design tokens (colors, typography scales, component hooks) as CSS custom properties. |
| `@hcl-software/dx-blueprint-react-components/components.css` | Styles for all components, plus the icon fonts and carousel styles they use. Uses the tokens. |
| `@hcl-software/dx-blueprint-react-components/bootstrap.css` | Bootstrap 5 CSS. Needed by components built on `react-bootstrap`, see below. |
| `@hcl-software/dx-blueprint-react-components/index.css` | Everything in one file: tokens, Bootstrap, then components. For apps that want one import. |

The same all-in-one file is also available at `dist/cjs/index.css`, `dist/esm/index.css` and `dist/umd/index.css`.

### Bootstrap is opt-in

About 50 components are built on `react-bootstrap` (grid `Container`/`Row`/`Col`, `Form`, `Modal`, ...). Those components rely on Bootstrap's CSS for their layout. Without it, for example, `DXPagination` renders as a vertical bulleted list and `DXDirectoryCard` and `DXChartCard` lose their layout. If you load only `tokens.css` and `components.css`, load `bootstrap.css` too (or your own Bootstrap 5 build) wherever you use them. Components that are not built on `react-bootstrap`, such as `DXButton` and `DXCard`, render correctly without it. Load `index.css` instead if you want everything without choosing.

### Fonts

The tokens use Noto Sans with system fallbacks (`"Noto Sans", "NotoSans", system-ui, -apple-system, "Segoe UI", sans-serif`); a few tokens name Montserrat or Segoe UI first and fall back to the same stack. **No font files are shipped.** If Noto Sans is not installed on the user's device, add it yourself, for example:

- Google Fonts, in your HTML `<head>`:

  ```html
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;600;700&display=swap" rel="stylesheet">
  ```

- Or self-host with [Fontsource](https://fontsource.org/fonts/noto-sans):

  ```bash
  npm install @fontsource/noto-sans
  ```

  ```ts
  import "@fontsource/noto-sans/400.css";
  import "@fontsource/noto-sans/600.css";
  import "@fontsource/noto-sans/700.css";
  ```

### Overriding tokens

Override any token with a plain rule in your own stylesheet, loaded before or after the library's CSS:

```css
:root {
  --primary-primary: #123456;
}
```

The package declares its tokens under `:where(:root)`, which has zero specificity, so your values always win regardless of load order. You can also set tokens on any ancestor element to theme part of a page.

### Script tag

For pages without a bundler, load `dist/umd/index.css` and `dist/umd/index.js`. The script exposes the global `TRF` and expects `React` and `ReactDOM` to be loaded first as globals.

## Requirements and limitations

- A bundler that handles CSS imports and package `exports` (Vite, webpack 5, ...) is required. Importing the package straight from Node without a bundler (plain Node ESM, or server rendering without a bundler) is not supported yet.
- Dependency versions are resolved by your package manager, not baked into the package.

## What's Included

### Component Families

| Family | Purpose | Examples |
|--------|---------|----------|
| **DX** | General-purpose portal components | `DXHeroBanner`, `DXNavigationHeader`, `DXCard`, `DXMegaMenu`, `DXDataTable`, `DXCalendar` |
| **CEC** | [Connections Engagement Center](https://www.hcltechsw.com/connections) integration | `CECNewsTile`, `CECEvent`, `CECPagination`, `CECNewsOverview` |

### Shared Utilities

The library also exports helpers for links, buttons, icons, dates, HTML sanitization, charts, and navigation — see the Storybook docs for the full API.

## Documentation

- **Current docs:** [hcl-tech-software.github.io/dx-blueprint-react-components](https://hcl-tech-software.github.io/dx-blueprint-react-components/)
- **Archive (versioned):** [opensource.hcltechsw.com/dx-blueprint-storybook](https://opensource.hcltechsw.com/dx-blueprint-storybook/latest/)
- **Local:** `npm run dev` then open http://localhost:6006

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development setup, coding conventions, testing, and build instructions. All contributions require a signed [Contributor License Agreement (CLA)](https://cla-assistant.io/HCL-TECH-SOFTWARE/dx-blueprint-react-components).

## Accessibility

We are committed to making DX Blueprint components accessible. Automated accessibility tooling (`eslint-plugin-jsx-a11y` and `@storybook/addon-a11y`) is planned for a future release. If you encounter an accessibility issue, please [open a bug report](https://github.com/HCL-TECH-SOFTWARE/dx-blueprint-react-components/issues/new?template=bug_report.yml).

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for release history.

## Architecture

See [ARCHITECTURE.md](ARCHITECTURE.md) for the technical design, build pipeline, styling system, and dependency overview.

## Security

See [SECURITY.md](SECURITY.md) for reporting vulnerabilities.

## Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md).

## License

[Apache-2.0](LICENSE)
