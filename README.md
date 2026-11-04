# iu

TypeScript + vanilla-extract foundations for a future Solid 2 component library.
ESM only. No components, provider, global reset, bundled fonts, release or deployment.
The old implementation is intentionally replaced; Git history is retained.

## Development

Node 24+ and npm. `npm ci`, `npm run check`, `npx playwright install chromium`,
then `npm test`. CI runs the same checks on Node 24. `npm run build` produces
ESM JavaScript, source maps, TypeScript declarations and `dist/styles.css`.
`npm pack` makes a local installable tarball. The package remains private under
its existing name `iu`; publication/name/license decisions are deferred. The
existing BSD metadata is retained (the old repository supplied no license text).

## Application setup

Install the local tarball and provide Solid 2 in the application. Import CSS once
in the application entry; consumers do not need a vanilla-extract plugin.

```sh
npm install ./iu-0.0.0.tgz
npm install @fontsource-variable/inter @fontsource-variable/noto-sans
```

```tsx
import '@fontsource-variable/inter';
import '@fontsource-variable/noto-sans';
import 'iu/styles.css';
import { foundation, element, focusRing } from 'iu';

// Plain native elements illustrating the foundation, not library components.
<section class={foundation}>
  <p class={element}>Application content</p>
  <button class={`${element} ${focusRing}`}>Application action</button>
</section>
```

Fonts are application-owned, optional dependencies; iu does not fetch or embed
font files or declare @font-face. The exact stack is `"Inter Variable", "Noto Sans
Variable", sans-serif`. Noto Sans does not cover Korean/CJK: the OS sans-serif
fallback handles missing glyphs. An application needing deterministic Korean
rendering must load an appropriate font such as Noto Sans KR and override the
font-family token. Variable weights, subset loading and font-display policy are
also the app's responsibility.

## Public foundation

- `colors`: unchanged [Open Color](https://yeun.github.io/open-color/) 1.9.1 palette,
  including the original 0–9 scales. No new palette. MIT notice is included in
  THIRD_PARTY_NOTICES.md and the package. The JSON palette is compiled to ESM.
- `typography`: font stack and explicit default size, weight and line height.
- `theme`: opt-in CSS variable definitions. `vars`: typed references to these
  variables. Text/surface/border/focus map to gray 9, white, gray 4 and blue 7.
- `element`: explicit box model, typography, color and text defaults for each
  library-owned element. Apply on every owned element, including form controls.
- `foundation`: theme + element + block display and surface background, suitable
  for an application subtree. `focusRing`: opt-in :focus-visible outline.
- `JSX`: type-only re-export from Solid 2's `@solidjs/web`.

The theme must be on an ancestor or the styled element itself. Portals outside
that subtree need their own theme class. Override the custom properties through
`vars` in application CSS/vanilla-extract. No global selectors, descendant reset,
`all: unset`, !important or blanket outline removal are emitted. Classes are
unlayered so ordinary element/universal resets cannot win merely by loading
later. This is resistance, not CSS isolation: !important, higher specificity,
and same-specificity later declarations can override styles. Each future
component still needs explicit display/layout/interaction/disabled styles; this
foundation deliberately does not pretend to reset every possible native element.

## Solid 2 and rieul.app

Verified 2026-11-04: npm `solid-js@next` and `@solidjs/web@next` are
`2.0.0-rc.21`; stable Solid is still 1.x. Development pins rc.21; the packaged
consumer test pins rieul.app's rc.20, Vite 8.3.5 and
`@solidjs/vite-plugin@3.0.0-next.54`. The peer range accepts rc.20 onward in the
2.x line; future RCs are not claimed tested. Solid 1 is unsupported. JSX uses
`jsxImportSource: "@solidjs/web"`, and DOM APIs come from `@solidjs/web`.

This release has no runtime Solid components, so no DOM-specific library
compiler or conditional SSR component build is necessary. Before adding any,
implement and test Solid's `solid` export condition/JSX compilation, external
runtimes and SSR/hydration. Do not bundle a second Solid runtime.

The test installs the actual tarball in a separate temporary project, checks
public declarations, builds TSX with the real Solid 2 compiler, and opens it in
Chromium. It checks a host reset loaded after iu, computed fonts/box model/color,
keyboard focus outline and runtime errors. This models rieul.app's web stack;
it does not modify or claim an end-to-end build of rieul.app itself. Real font
loading, cross-browser rendering and future component accessibility are not yet
tested. `npm test` requires network for the isolated consumer installation.

The library uses Rollup with vanilla-extract CSS extraction, following the
[official library guidance](https://vanilla-extract.style/documentation/integrations/rollup/).
The [Vite plugin explicitly does not support library builds](https://vanilla-extract.style/documentation/integrations/vite/).
See also [Solid 2 migration](https://github.com/solidjs/solid/blob/next/documentation/solid-2.0/MIGRATION.md)
and [Fontsource](https://fontsource.org/).
