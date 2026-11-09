# iu

UI components, styles, and tokens.

## Usage

Install the package archive supplied with your release in your application:

```sh
pnpm add /path/to/iu-0.0.0.tgz
```

The current component implementation requires `solid-js` and `@solidjs/web` 2.x. Set TypeScript's
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
or use the system fallback. The default font stack is `"Inter Variable", "Noto Sans KR", "Noto Sans", sans-serif`:
Inter comes first, followed by Korean-first Noto Sans KR and broader Noto Sans
character fallback. Load fonts with these CSS family names in your app.

## API

| Export | Description |
| --- | --- |
| `CopyButton` / `CopyButtonProps` / `CopyButtonState` / `CopyButtonMessages` | Copy text with progress, success, and error feedback |
| `Tooltip` / `TooltipProps` / `TooltipTriggerProps` | Hover and focus descriptions with automatic positioning |
| `CodeBlock` / `CodeBlockProps` / `CodeBlockLanguage` | Source code with Shiki syntax highlighting |
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
<Button padding="fit">Cancel</Button>
<Button padding="custom" style={{ padding: '1em 2em' }}>Custom padding</Button>
<Button variant="warning">Proceed with caution</Button>
<Button variant="danger">Delete</Button>
<Button variant="primary" color={colors.violet[6]}>Custom</Button>
<Button variant="ghost" disabled>Unavailable</Button>
```

- `variant`: `primary`, `secondary` (default), `ghost`, `warning`, or `danger`
- `color`: Any CSS color, including Open Color values and CSS variables. Overrides the variant's tint while keeping filled surfaces distinct in either theme.
- `padding`: `fit`, `normal` (default), or `custom`
- Font size is inherited; built-in dimensions use `em`.
- `fit` has a `1.5em` minimum height, fits a `1.5` line height and aligns with surrounding text.
- `normal` has a `2.5em` minimum height.
- `custom` leaves minimum height and padding to your `class` or `style`.
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
- Joins direct `Button` children. Set variant, padding, color, and disabled on each button.
- Uses `role="group"`; provide `aria-label` or `aria-labelledby` to name the related actions.
- Each button keeps native Tab, Enter, and Space behavior. No selection state or arrow-key navigation.
- Native div attributes, events, `ref`, `class`, and `style` are forwarded.

## Code

Use `Code` for short commands, identifiers, and other inline code. It renders a
native `code` element and inherits the surrounding font size and line height.

```tsx
<Text>Run <Code>pnpm dev</Code> to start the development server.</Text>
```

## CodeBlock

```tsx
import { CodeBlock } from 'iu';

<CodeBlock code={'const answer = 42;'} language="typescript" />
<CodeBlock code={'pnpm install'} language="shellscript" />
<CodeBlock code={'Plain text'} language="text" theme="dark" />
```

- `code`: Required source string. HTML and JSX are displayed as text.
- `copyable`: Show a CopyButton inside the block to copy the original source. Defaults to false.
- `language`: `tsx` (default), `javascript`, `typescript`, `json`, `css`, `html`, `shellscript`, or `text`.
- `padding`: `fit`, `normal` (default), or `custom`. Fit uses compact spacing and a `1.5em` minimum height; normal matches a normal Button with a `2.5em` minimum height. Custom leaves padding and minimum height to your class or style.
- `theme`: `auto` (default), `light`, or `dark`. Auto follows the inherited CSS color scheme, including iu roots with `data-theme`.
- Uses Shiki with GitHub light/dark colors and a JavaScript regex engine.
- Uses a monospace font while inheriting surrounding font size, weight, line height, and letter spacing.
- A single line matches the normal Button height at the same font size.
- Preserves indentation and line breaks. Long lines scroll horizontally.
- Uses native `pre` / `code` elements; focusable by default for keyboard scrolling.
- Native pre attributes, events, `ref`, `class`, and `style` are forwarded. Customize the accessible name with `aria-label`, or focusability with `tabindex`.
- Source remains left to right in RTL layouts. No editing or selection state is managed.
- Import `iu/styles.css` once. Can be used outside `root`; an enclosing root supplies theme and focus color overrides.
- Shiki initializes on first render. Unused CodeBlock code can be removed by bundlers; the Shiki dependency is external in the library build.

## Tooltip

```tsx
import { Button, Tooltip } from 'iu';

<Tooltip content="Save your changes" placement="top">
  {trigger => <Button {...trigger} onClick={save}>Save</Button>}
</Tooltip>
```

- `content`: Required plain text. Empty content suppresses display.
- `children`: A render function. Spread its trigger props onto one focusable element, preserving its ref, description, and handlers.
- `color`: Any CSS color, including Open Color values and CSS variables. Uses Button’s filled neutral tint approach in both themes; the arrow inherits the background and border colors.
- `placement`: `top` (default), `bottom`, `left`, `right`, with optional `-start` / `-end` alignment. Alignment follows RTL. The decorative arrow points toward the trigger and follows placement changes. Floating UI flips/shifts to fit the viewport and updates on scroll/resize.
- `delay` / `closeDelay`: Hover opening delay (500ms) and closing delay (100ms). Focus opens immediately. Pointer movement onto the tooltip keeps it visible.
- `disabled`: Suppresses display and removes the tooltip description reference; does not disable the trigger.
- `open`, `defaultOpen`, `onOpenChange`: Controlled or uncontrolled visibility, closed by default. Pair `open` with `onOpenChange` to handle dismissal requests.
- `describedBy`: Additional description IDs to retain on the trigger.
- `id`, `class`, `style`: Customize the tooltip surface. Default IDs survive SSR/hydration.
- Uses `role="tooltip"` and `aria-describedby`. Escape dismisses without moving focus. Keep an accessible name on the trigger, independently of the description.
- Use plain text, with no interactive content. Essential instructions should remain visible; native disabled buttons cannot receive keyboard focus.
- Requires the browser Popover API. The top layer avoids ancestor clipping and preserves inherited typography and theme without portaling outside the root.
- Import `iu/styles.css` once; use within `root` for iu typography and themes.

## CopyButton

```tsx
import { CopyButton } from 'iu';

<CopyButton text="pnpm install" variant="primary">Copy</CopyButton>
<CopyButton text={source} padding="fit">Copy source</CopyButton>
<CopyButton text={source} aria-label="Copy source" />
<CopyButton text={async () => await loadSource()}>
  {state => state === 'copied' ? 'Copied' : 'Copy'}
</CopyButton>
```

- `text`: A source string or a function returning a string / Promise of a string. The function runs only on activation, never during render, SSR, or hydration. Supports empty text. Resolver errors follow the same failure path as clipboard errors.
- Omit children for an icon-only button. Set `aria-label` to identify what is copied; the fallback accessible name is Copy.
- `resetAfter`: Feedback duration in milliseconds (2000). Zero retains feedback until the next action or a change to the text prop / resolver identity. Lazy resolvers are not evaluated to watch their underlying source.
- `tooltip` / `tooltipPlacement`: Built-in Tooltip shows idle action text and current feedback. Customize the idle text with `tooltip` (defaults to aria-label, string children, or Copy), or set it to `false` to disable. Placement defaults to top. Existing description IDs, refs, and trigger event handlers are preserved.
- `messages`: Override the live announcements for `copying`, `copied`, `error` (defaults: Copying, Copied, Copy failed). These are independent of visible children.
- `children`: Visible content for every state, with no default label or automatic replacement. A render function receives `idle`, `copying`, `copied`, or `error` for custom feedback content.
- `onCopy(text)` / `onCopyError(error)`: Successful/failed write callbacks. `onCopy` replaces the native copy event prop.
- All other Button props are forwarded. `onClick` runs first and can cancel copying with `preventDefault()`.
- Uses Material Symbols package data. No icon SVG paths are vendored.
- Pending writes block duplicate activation with `aria-busy` and `aria-disabled` while retaining focus. Native disabled buttons do not copy.
- A visually hidden status announces feedback. Icon-only buttons retain an accessible name. Timers and pending feedback are cleaned up on unmount.
- Requires Clipboard API support, a secure context (HTTPS/localhost), and browser permission. Writes only on activation, never reads clipboard contents. Failed writes display feedback and may be retried.
- Defaults to `type="button"`; uses Button's inherited typography, variants, color, padding, and focus styles. Import `iu/styles.css` and use within `root`.

## Heading, Paragraph, and Text

`Heading` defaults to `h2` and accepts `h1`–`h6`. `Text` defaults to `span`
and accepts `p`, `span`, and `div`. The `as` prop selects the HTML tag.
The `size` prop selects typography independently and defaults to `md`.
`Paragraph` renders a `p` and shares the Text size scale. Heading and
Paragraph include document margins. Text has zero margin. Prose applies the
same margins to native headings and paragraphs within its scope.

| Size | Heading | Text |
| --- | --- | --- |
| `xs` | 1rem | 0.75rem |
| `sm` | 1.25rem | 0.875rem |
| `md` | 1.5rem | 1rem |
| `lg` | 2rem | 1.125rem |
| `xl` | 2.5rem | 1.25rem |

```tsx
<Heading as="h1" size="xl">Settings</Heading>
<Paragraph>Choose how the app looks.</Paragraph>
<Text size="sm">Optional</Text>
```

## Prose

Use `Prose` within `root` to style native `h1`–`h6`, `p`, links, and buttons.
Heading presets use rem units, and native buttons share the default Button styles.
Prose renders a `div` by default. Use `as="article"` or `as="section"` to choose a semantic container.
The `unroot` class ends the Prose styling scope.

```tsx
<Prose as="section" aria-labelledby="profile-heading">
  <h2 id="profile-heading">Profile settings</h2>
  <p>Read the <a href="/guide">setup guide</a>.</p>
  <button type="button">Save</button>
</Prose>
```

## Build

Run from the repository root:

```sh
pnpm --filter iu build
pnpm --filter iu pack
```

Output: browser and server ESM builds, type declarations, and `dist/styles.css`.
Install the generated tarball in external projects.
