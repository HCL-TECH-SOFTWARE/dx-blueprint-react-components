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
