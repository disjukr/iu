import { createSignal } from 'solid-js';
import { render } from '@solidjs/web';
import { Button, ButtonGroup, colors, root, glass, typography, vars } from 'iu';
import 'iu/styles.css';
import './styles.css';

const setup = `import 'iu/styles.css';
import { Button, root, unroot } from 'iu';

<section class={root}>
  <p>Hello, iu.</p>
  <Button variant="primary">Continue</Button>
  <div class={unroot}>
    <p>Browser defaults.</p>
    <div class={root}>iu styles resume here.</div>
  </div>
</section>`;

function App() {
  const [count, setCount] = createSignal(0);
  const [dark, setDark] = createSignal(false);
  const palette = Object.entries(colors).filter((entry): entry is [string, string[]] => Array.isArray(entry[1]));

  return <div class="site">
    <header class="header">
      <a href="#" class="wordmark" aria-label="iu home">iu<span> / SolidJS UI</span></a>
      <span class="version">0.0.0 · Solid 2</span>
    </header>
    <div class="layout">
      <nav class="sidebar" aria-label="Documentation navigation">
        <p class="nav-label">DOCUMENTATION</p>
        <a href="#introduction">Introduction <span>01</span></a>
        <a href="#getting-started">Getting started <span>02</span></a>
        <a href="#colors">Colors <span>03</span></a>
        <a href="#typography">Typography <span>04</span></a>
        <a href="#examples">Examples <span>05</span></a>
        <a href="#api">API <span>06</span></a>
      </nav>
      <main id="content">
        <section id="introduction" class="hero">
          <h1>UI for SolidJS.</h1>
          <p class="intro">Colors, typography, themes, and focus styles for Solid 2.</p>
          <a class="primary-link" href="#getting-started">Get started <span aria-hidden="true">↗</span></a>
          <div class="hero-meta"><span>Solid 2</span><span>TypeScript</span><span>vanilla-extract</span><span>ESM</span></div>
        </section>

        <section id="getting-started">
          <p class="eyebrow">01 / GETTING STARTED</p>
          <h2>Getting started</h2>
          <p>Use <code>iu: workspace:*</code> in this workspace, or install a tarball in another project.</p>
          <pre><code>{`pnpm --filter iu build
pnpm --filter iu pack
# Install the generated tarball in an external app
pnpm add /path/to/iu-0.0.0.tgz`}</code></pre>
          <p>Requires Solid 2: <code>solid-js</code> and <code>@solidjs/web</code>. Set <code>jsxImportSource: "@solidjs/web"</code> and import the CSS once.</p>
          <pre><code>{setup}</code></pre>
          <p><code>root</code> sets tokens, typography, and a subtree reset. <code>unroot</code> clears those defaults; a nested <code>root</code> resumes them. Requires CSS <code>@scope</code> support.</p>
        </section>

        <section id="colors">
          <p class="eyebrow">02 / COLORS</p>
          <h2>Colors</h2>
          <p>Open Color 1.9.1. Access shades with <code>colors.blue[7]</code>.</p>
          <div class="palette">{palette.map(([name, shades]) => <div class="palette-row">
            <span class="palette-name">{name}</span>
            <div class="swatches">{shades.map((color, index) => <div class="swatch" style={{ 'background-color': color, color: index < 5 ? colors.gray[9] : colors.white }} title={`${name}[${index}] ${color}`}>
              <span>{index}</span><small>{color}</small>
            </div>)}</div>
          </div>)}</div>
        </section>

        <section id="typography">
          <p class="eyebrow">03 / TYPOGRAPHY</p>
          <h2>Typography</h2>
          <div class="type-specimen"><p>Aa</p><span>The quick brown fox jumps over the lazy dog.</span></div>
          <dl class="specs"><div><dt>Font family</dt><dd>{typography.fontFamily}</dd></div><div><dt>Size / Line height</dt><dd>{typography.fontSize} / {typography.lineHeight}</dd></div><div><dt>Weight</dt><dd>{typography.fontWeight}</dd></div></dl>
          <p>Load fonts in your app. This site uses system fonts.</p>
        </section>

        <section id="examples">
          <p class="eyebrow">04 / EXPERIMENT</p>
          <h2>Try it yourself</h2>
          <p>Change the theme or press Tab to check keyboard focus.</p>
          <div class={`${root} ${glass} demo`} data-theme={dark() ? 'dark' : 'light'}>
            <span class="demo-label">LIVE EXAMPLE</span>
            <h3 class="demo-title">Counter</h3>
            <p>Click to increment.</p>
            <div class="demo-actions">
              <Button variant="primary" onClick={() => setCount(value => value + 1)}>Clicks <output aria-live="polite">{count()}</output></Button>
              <Button aria-pressed={dark() ? 'true' : 'false'} onClick={() => setDark(value => !value)}>Dark theme {dark() ? 'on' : 'off'}</Button>
              <Button variant="warning">Warning</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="primary" color={colors.violet[6]}>Custom color</Button>
            </div>
          </div>
          <div class={`${root} demo-actions`}>
            <ButtonGroup aria-label="History"><Button>Undo</Button><Button>Redo</Button><Button disabled>Restore</Button></ButtonGroup>
            <ButtonGroup orientation="vertical" aria-label="File actions"><Button>Save</Button><Button>Save as</Button></ButtonGroup>
          </div>
          <pre><code>{`<ButtonGroup aria-label="History">
  <Button>Undo</Button>
  <Button>Redo</Button>
</ButtonGroup>`}</code></pre>
          <pre><code>{`import { vars } from 'iu';

// Override variables in your app's CSS or vanilla-extract styles
// vars.color.surface → ${vars.color.surface}
// vars.color.text    → ${vars.color.text}`}</code></pre>
        </section>

        <section id="api">
          <p class="eyebrow">05 / REFERENCE</p>
          <h2>API</h2>
          <div class="table-scroll"><table><thead><tr><th>Export</th><th>Purpose</th></tr></thead><tbody>{[
            ['root / unroot', 'Start or stop the scoped reset and inherited defaults'],
            ['Button', 'Native button with variant and size options'],
            ['ButtonGroup', 'Joined related actions in horizontal or vertical layout'],
            ['glass', 'Translucent surface with blur, border, and shadow'],
            ['colors', 'The original Open Color palette'], ['typography', 'Font stack, size, weight, and line height'],
            ['vars', 'Typed CSS variables for theme overrides'], ['focusRing', ':focus-visible styles for keyboard focus'],
            ['JSX', 'Type re-export from @solidjs/web'],
          ].map(([name, description]) => <tr><td><code>{name}</code></td><td>{description}</td></tr>)}</tbody></table></div>
          <p>Portals outside the root need their own <code>root</code> class. <code>unroot</code> does not disable explicit component classes or application styles.</p>
        </section>
        <footer>iu</footer>
      </main>
    </div>
  </div>;
}

render(() => <App />, document.getElementById('app')!);
