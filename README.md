# HCL DX Blueprint — React Component Library

A React 19 + TypeScript component library for [HCL Digital Experience](https://www.hcltechsw.com/dx). Blueprint provides 100+ production-ready, accessible UI components that can be assembled into portal sites and standalone SPAs.

## Installation

```bash
npm install @hcl-software/dx-blueprint-react-components
```

React and React-DOM 19 are peer dependencies — the library does not bundle them.

## Quick Start

```tsx
import { DXCard, DXButton } from '@hcl-software/dx-blueprint-react-components';

function App() {
  return (
    <DXCard title="Welcome">
      <DXButton label="Get Started" displayType="primary" onClick={() => {}} />
    </DXCard>
  );
}
```

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
