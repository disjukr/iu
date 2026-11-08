import { createSignal } from 'solid-js';
import { Button, CodeBlock, CopyButton, root, glass } from 'iu';

const command = 'pnpm install';

const sample = `import { Button } from 'iu';

<Button variant="primary" onClick={save}>
  Save draft
</Button>`;

export function CodeBlockPage() {
  const [dark, setDark] = createSignal(false);
  return <section id="code-block">
    <p class="eyebrow">CONTENT</p>
    <h1>CodeBlock</h1>
    <p>Display readable source code with Shiki syntax highlighting. A monospace font inherits the surrounding size, weight, line height, and letter spacing. Indentation and line breaks are preserved; long lines scroll horizontally.</p>
    <h2>Examples</h2>
    <div class={`${root} ${glass} demo`} data-theme={dark() ? 'dark' : 'light'}>
      <Button aria-pressed={dark() ? 'true' : 'false'} onClick={() => setDark(value => !value)}>Dark theme {dark() ? 'on' : 'off'}</Button>
      <CodeBlock code={sample} aria-label="Button source code" />
    </div>
    <h3>Alongside a button</h3>
    <p>A single line matches the height of a normal Button while keeping the surrounding typography.</p>
    <div class={`${root} code-action-row`}>
      <CodeBlock code={command} language="shellscript" />
      <CopyButton text={() => command} variant="primary" aria-label="Copy command">Copy</CopyButton>
    </div>
    <h3>Padding</h3>
    <div class={`${root} code-action-row`}>
      <CodeBlock code="Fit" language="text" padding="fit" />
      <CodeBlock code="Normal" language="text" />
      <CodeBlock code="Custom" language="text" padding="custom" style={{ padding: '1em 2em' }} />
    </div>
    <h3>Shell commands</h3>
    <CodeBlock code="pnpm add /path/to/iu-0.0.0.tgz" language="shellscript" />
    <h3>Plain text</h3>
    <CodeBlock code={'No highlighting required.\n  Indentation stays intact.'} language="text" />
    <h2>Usage</h2>
    <CodeBlock code={`import 'iu/styles.css';
import { CodeBlock } from 'iu';

<CodeBlock code={'const answer = 42;'} language="typescript" />
<CodeBlock code={'pnpm install'} language="shellscript" />
<CodeBlock code={'Plain text'} language="text" theme="dark" />`} />
    <h2>Props</h2>
    <dl class="specs">
      <div><dt>code</dt><dd>Required source string. Rendered as text, including HTML and JSX.</dd></div>
      <div><dt>language</dt><dd>tsx (default), javascript, typescript, json, css, html, shellscript, or text</dd></div>
      <div><dt>padding</dt><dd>normal (default), fit for compact spacing, or custom for your own padding and minimum height. Fit has a 1.5em minimum height; normal has a 2.5em minimum height.</dd></div>
      <div><dt>theme</dt><dd>auto (default) follows the inherited color scheme, including iu roots with data-theme. Use light or dark for an explicit appearance.</dd></div>
    </dl>
    <h2>Accessibility and behavior</h2>
    <p>Uses native pre and code elements. The block is focusable so keyboard users can scroll long lines. Set aria-label to describe the snippet, or tabindex to customize keyboard focus. Native pre attributes, events, ref, class, and style are forwarded. Source code stays left to right inside RTL layouts.</p>
  </section>;
}
