# Component icons

Use Material Symbols from the framework-independent
`@iconify-icons/material-symbols` package when components need icons.
Import individual icons, for example:

```tsx
import contentCopy from '@iconify-icons/material-symbols/content-copy';
```

Render the imported SVG data with native JSX or a small shared adapter. Do not
copy SVG paths or vendor icon files into the repository. Do not use the
Solid-specific icon wrapper package; keep the icon data dependency independent
of the framework version.

Use dimensions relative to surrounding typography (normally `1em`) and inherit
`currentColor`. Hide decorative icons from assistive technology; give icon-only
controls an accessible name on the control. Only render trusted package icon
markup through an adapter's innerHTML.
