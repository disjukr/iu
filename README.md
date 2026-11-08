# iu

UI component library and documentation site.

- [`packages/iu`](packages/iu): Library
- [`apps/docs`](apps/docs): Documentation and examples
- [`apps/lab`](apps/lab): Local experiments

## Development

Requires Node.js 24+ and pnpm 12.16.1.

```sh
pnpm install
pnpm dev
```

Runs the documentation site and lab.
Use `pnpm dev:lab` for just the lab.
Edit `apps/lab/src/Experiment.tsx` to try out changes.
Development uses iu source directly; no library build is needed.
Style edits update live. Library TS/TSX edits reload the page, including after errors.
Production builds use the packaged library.

| Command | Description |
| --- | --- |
| `pnpm dev:lab` | Run the lab at localhost:5174 |
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
