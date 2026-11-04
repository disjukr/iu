# iu

SolidJS UI library and documentation site.

- [`packages/iu`](packages/iu): Library
- [`apps/docs`](apps/docs): Documentation and examples

## Development

Requires Node.js 24+ and pnpm 12.16.1.

```sh
pnpm install
pnpm dev
```

Runs the documentation site and watches the library for changes.

| Command | Description |
| --- | --- |
| `pnpm build` | Build all packages |
| `pnpm check` | Type-check all packages |
| `pnpm test` | Build and run all tests |
| `pnpm test:package` | Build and test the library without a browser |
| `pnpm preview` | Preview the built documentation site |

Install Chromium before running browser tests:

```sh
pnpm --filter iu exec playwright install chromium
```

Consumer tests require network access to install dependencies.
