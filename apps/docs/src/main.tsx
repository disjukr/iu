import { createSignal, onCleanup, Loading } from 'solid-js';
import { render } from '@solidjs/web';
import { components, matchesSearch, pages } from './catalog';
import 'iu/styles.css';
import './styles.css';

function route() {
  const hash = location.hash.slice(1);
  if (!hash) return '/introduction';
  // Preserve links from the original single-page documentation.
  if (!hash.startsWith('/')) return hash === 'examples' ? '/components' : ['button', 'button-group'].includes(hash) ? `/components/${hash}` : `/${hash}`;
  return hash;
}

function ComponentIndex() {
  const [query, setQuery] = createSignal('');
  const filtered = () => components.filter(page => matchesSearch(page, query()));
  return <section>
    <p class="eyebrow">COMPONENTS</p>
    <h1>Components</h1>
    <p>Find a component, explore its examples, and learn how to use it.</p>
    <label class="search-label" for="component-search">Find a component</label>
    <input id="component-search" class="search" type="search" placeholder="Name, purpose, or keyword…" value={query()} onInput={event => setQuery(event.currentTarget.value)} />
    <p role="status">{filtered().length} components</p>
    <div class="component-grid">{filtered().map(page => <a class="component-card" href={`#${page.path}`}>
      <span class="eyebrow">{page.group}</span><h2>{page.title}</h2><p>{page.description}</p>
    </a>)}</div>
    {filtered().length === 0 && <p>No matching components. Try another name or keyword.</p>}
  </section>;
}

function App() {
  const [path, setPath] = createSignal(route());
  const [query, setQuery] = createSignal('');
  const [menuOpen, setMenuOpen] = createSignal(false);
  let main: HTMLElement | undefined;
  const current = () => pages.find(page => page.path === path());
  const neighbors = () => {
    const index = components.findIndex(page => page.path === path());
    return [components[index - 1], components[index + 1]].filter(Boolean);
  };
  const title = () => path() === '/components' ? 'Components' : current()?.title ?? 'Page not found';
  document.title = `${title()} — iu`;
  function navigate() {
    const next = route();
    setPath(next);
    setMenuOpen(false);
    setQuery('');
    document.title = `${next === '/components' ? 'Components' : pages.find(page => page.path === next)?.title ?? 'Page not found'} — iu`;
    requestAnimationFrame(() => { window.scrollTo(0, 0); main?.focus({ preventScroll: true }); });
  }
  window.addEventListener('hashchange', navigate);
  onCleanup(() => window.removeEventListener('hashchange', navigate));
  const groups = () => [...new Set(pages.map(page => page.group))];
  const results = () => pages.filter(page => matchesSearch(page, query()));

  return <div class="site">
    <a class="skip-link" href="#content" onClick={event => { event.preventDefault(); main?.focus(); }}>Skip to content</a>
    <header class="header">
      <a href="#/introduction" class="wordmark" aria-label="iu home">iu<span> / UI components</span></a>
      <span class="version">0.0.0</span>
      <button class="menu-toggle" type="button" aria-expanded={menuOpen() ? 'true' : 'false'} aria-controls="docs-navigation" onClick={() => setMenuOpen(value => !value)}>Documentation</button>
    </header>
    <div class="layout">
      <nav id="docs-navigation" class={['sidebar', menuOpen() && 'menu-open']} aria-label="Documentation navigation">
        <label class="search-label" for="docs-search">Search documentation</label>
        <input id="docs-search" class="search" type="search" placeholder="Search documentation…" value={query()} onInput={event => setQuery(event.currentTarget.value)} />
        <a href="#/components" aria-current={path() === '/components' ? 'page' : undefined}>All components <span>{components.length}</span></a>
        {groups().map(group => <div class="nav-group" hidden={!results().some(page => page.group === group)}>
          <h2 class="nav-label">{group}</h2>
          {results().filter(page => page.group === group).sort((a, b) => a.kind === 'component' && b.kind === 'component' ? a.title.localeCompare(b.title) : 0).map(page =>
            <a href={`#${page.path}`} aria-current={path() === page.path ? 'page' : undefined}>{page.title}</a>)}
        </div>)}
        {query().trim() && <p role="status">{results().length ? `${results().length} results` : 'No matching documentation.'}</p>}
      </nav>
      <main id="content" ref={el => { main = el; }} tabindex={-1}>
        <Loading fallback={<p role="status">Loading documentation…</p>}>{path() === '/components' ? <ComponentIndex /> : current() ? current()!.render() : <section><h1>Page not found</h1><p>This documentation page does not exist.</p><a href="#/components">Browse components</a></section>}</Loading>
        {current()?.kind === 'component' && <div class="page-links"><a href="#/components">← All components</a>{neighbors().map(page => <a href={`#${page.path}`}>{page.title} →</a>)}</div>}
      </main>
    </div>
  </div>;
}

render(() => <App />, document.getElementById('app')!);
