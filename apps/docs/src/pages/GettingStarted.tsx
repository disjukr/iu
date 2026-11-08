import { CodeBlock } from 'iu';
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

export function GettingStarted() {
  return <section id="getting-started">
          <p class="eyebrow">FOUNDATIONS</p>
          <h1>Getting started</h1>
          <p>Install the iu package archive supplied with your release in your application:</p>
          <CodeBlock language="shellscript" code="pnpm add /path/to/iu-0.0.0.tgz" />
          <p>The current component implementation requires <code>solid-js</code> and <code>@solidjs/web</code> 2.x. Install compatible peer dependencies and set TypeScript’s <code>jsxImportSource</code> to <code>@solidjs/web</code>.</p>
          <p>Import <code>iu/styles.css</code> once in your application entry point, then apply <code>root</code> to the area that uses iu.</p>
          <CodeBlock code={setup} />
          <p><code>root</code> sets tokens, typography, and a subtree reset. <code>unroot</code> clears those defaults; a nested <code>root</code> resumes them. Requires CSS <code>@scope</code> support.</p>
        </section>;
}
