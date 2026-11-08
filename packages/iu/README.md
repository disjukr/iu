# iu

UI styles and tokens for Solid 2.

## Usage

Requires `solid-js` and `@solidjs/web` 2.x. Set TypeScript's
`jsxImportSource` to `@solidjs/web`.

```tsx
import 'iu/styles.css';
import { Button, root, unroot, glass } from 'iu';

<section class={root}>
  <div class={glass}>
    <p>Hello, iu.</p>
    <Button variant="primary">Continue</Button>
  </div>
  <div class={unroot}>
    <p>Outside the iu reset.</p>
    <div class={root}>iu styles resume here.</div>
  </div>
</section>
```

Import CSS once. `root` sets tokens, typography, and a subtree reset.
`unroot` stops that reset and clears inherited iu tokens and typography.
An inner `root` starts a new scope. Explicit component classes and application
styles still apply inside `unroot`.
Requires a browser with CSS `@scope` support. Load fonts in your app,
or use the system fallback.

## API

| Export | Description |
| --- | --- |
| `ButtonGroup` / `ButtonGroupProps` | Joined related actions, horizontal or vertical |
| `Button` / `ButtonProps` | Native button component and its props |
| `root` | Tokens, typography, and scoped reset |
| `unroot` | Exit the root scope and clear inherited defaults |
| `glass` | Translucent surface with blur, border, and shadow |
| `colors` | Open Color palette |
| `typography` | Default font stack, size, weight, and line height |
| `vars` | Typed CSS variables for theme overrides |
| `focusRing` | Keyboard focus outline |
| `JSX` | JSX types from `@solidjs/web` |

Portals outside the root need their own `root` class.
Use `glass` inside a root for the default monochrome surface with a subtle blue tint.
Customize it through `vars.color` and `vars.glass`.
Theme and button colors use Open Color: gray/blue, orange for warning, and red for danger.
Set `data-theme="dark"` on a root for the dark theme (`light` by default).

## Button

```tsx
<Button variant="primary" onClick={save}>Save</Button>
<Button size="fit">Cancel</Button>
<Button size="custom" style={{ padding: '1em 2em' }}>Custom size</Button>
<Button variant="warning">Proceed with caution</Button>
<Button variant="danger">Delete</Button>
<Button variant="primary" color={colors.violet[6]}>Custom</Button>
<Button variant="ghost" disabled>Unavailable</Button>
```

- `variant`: `primary`, `secondary` (default), `ghost`, `warning`, or `danger`
- `color`: Any CSS color, including Open Color values and CSS variables. Overrides the variant's tint while keeping filled surfaces distinct in either theme.
- `size`: `fit`, `normal` (default), or `custom`
- Font size is inherited; built-in dimensions use `em`.
- `fit` fits a `1.5` line height and aligns with surrounding text.
- `custom` leaves height and padding to your `class` or `style`.
- Native button attributes, events, `ref`, `class`, and `style` are forwarded.
- Defaults to `type="button"`. Set `type="submit"` for form submission.

Use inside `root` and import `iu/styles.css` once.

## ButtonGroup

```tsx
import { Button, ButtonGroup } from 'iu';

<ButtonGroup aria-label="History">
  <Button>Undo</Button>
  <Button>Redo</Button>
</ButtonGroup>
```

- `orientation`: `horizontal` (default) or `vertical`. Horizontal layout follows `dir` for RTL.
- Joins direct `Button` children. Set variant, size, color, and disabled on each button.
- Uses `role="group"`; provide `aria-label` or `aria-labelledby` to name the related actions.
- Each button keeps native Tab, Enter, and Space behavior. No selection state or arrow-key navigation.
- Native div attributes, events, `ref`, `class`, and `style` are forwarded.

## Build

Run from the repository root:

```sh
pnpm --filter iu build
pnpm --filter iu pack
```

Output: browser and server ESM builds, type declarations, and `dist/styles.css`.
Install the generated tarball in external projects.
