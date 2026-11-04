# iu

UI styles and tokens for Solid 2.

## Usage

Requires `solid-js` and `@solidjs/web` 2.x. Set TypeScript's
`jsxImportSource` to `@solidjs/web`.

```tsx
import 'iu/styles.css';
import { foundation, element, focusRing } from 'iu';

<section class={foundation}>
  <p class={element}>Hello, iu.</p>
  <button class={`${element} ${focusRing}`}>Continue</button>
</section>
```

Import CSS once. Apply `element` to each styled element.
Load fonts in your app, or use the system fallback.

## API

| Export | Description |
| --- | --- |
| `colors` | Open Color palette |
| `typography` | Default font stack, size, weight, and line height |
| `theme` | Theme class |
| `vars` | Typed CSS variables for theme overrides |
| `element` | Base element styles |
| `foundation` | Theme, base styles, and surface background |
| `focusRing` | Keyboard focus outline |
| `JSX` | JSX types from `@solidjs/web` |

Place the theme on the styled element or an ancestor. Portals outside that
boundary need their own theme class.

## Build

Run from the repository root:

```sh
pnpm --filter iu build
pnpm --filter iu pack
```

Output: `dist/index.js`, type declarations, and `dist/styles.css`.
Install the generated tarball in external projects.
