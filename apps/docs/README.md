# iu documentation

The site uses hash routes so direct links and refreshes work on static hosting
without server rewrite rules. Each guide and component lives in its own module
under `src/pages` and loads on demand.

## Adding component documentation

1. Create a page module under `src/pages`, with one `h1` naming the component.
2. Follow the shared order: introduction, Examples (live demos), Usage (imports
   and copyable code), Props (defaults and options), Accessibility and behavior.
   Add controlled/uncontrolled state, RTL, errors, or composition when relevant.
3. Add a lazy import and an entry to `src/catalog.ts`: a stable
   `/components/kebab-case` path, title, description, semantic group, search
   keywords, and render function. Add semantic groups as needed (for example
   Forms, Navigation, Overlays, or Data display); implementation complexity
   tiers belong in planning, not user navigation.
4. Add behavior checks to `tests/site.test.mjs` as appropriate.

The registry drives navigation, search, the component index, and adjacent-page
links. Components are listed alphabetically within their semantic group.
Only published component documentation belongs in this catalog; `todo.md`
remains the planning inventory for the full component scope.

Keep introductions framework-neutral. Describe currently required framework
setup in Getting started. Font loading remains the application's responsibility.

```sh
pnpm --filter @iu/docs build
pnpm --filter @iu/docs test
```
