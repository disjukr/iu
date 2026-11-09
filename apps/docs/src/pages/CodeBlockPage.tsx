import { createSignal } from 'solid-js';
import { Button, CodeBlock, CopyButton, Heading, Paragraph, Text, glass, root } from 'iu';

const command = 'pnpm install';

const sample = `import { Button } from 'iu';

<Button variant="primary" onClick={save}>
  Save draft
</Button>`;

export function CodeBlockPage() {
  const [dark, setDark] = createSignal(false);
  return <section id="code-block">
    <Text as="p" class="eyebrow">CONTENT</Text>
    <Heading as="h1" size="xl">CodeBlock</Heading>
    <Paragraph>Display readable source code with Shiki syntax highlighting. A monospace font inherits the surrounding size, weight, line height, and letter spacing. Indentation and line breaks are preserved; long lines scroll horizontally.</Paragraph>
    <Heading as="h2">Examples</Heading>
    <div class={`${root} ${glass} demo`} data-theme={dark() ? 'dark' : 'light'}>
      <Button aria-pressed={dark() ? 'true' : 'false'} onClick={() => setDark(value => !value)}>Dark theme {dark() ? 'on' : 'off'}</Button>
      <div class="code-action-row">
        <CodeBlock code={sample} copyable aria-label="Button source code" />
      </div>
    </div>
    <Heading as="h3" size="sm">Single-line code with copy</Heading>
    <div class={`${root} code-action-row`}>
      <div>
        <Text as="p" size="sm">Normal</Text>
        <CodeBlock code={command} language="shellscript" copyable aria-label="Normal single-line code" />
      </div>
      <div>
        <Text as="p" size="sm">Fit</Text>
        <CodeBlock code={command} language="shellscript" padding="fit" copyable aria-label="Fit single-line code" />
      </div>
    </div>
    <Heading as="h3" size="sm">Alongside a button</Heading>
    <Paragraph>A single line matches the height of a normal Button while keeping the surrounding typography.</Paragraph>
    <div class={`${root} code-action-row`}>
      <CodeBlock code={command} language="shellscript" />
      <CopyButton text={() => command} variant="primary" aria-label="Copy command">Copy</CopyButton>
    </div>
    <Heading as="h3" size="sm">Padding</Heading>
    <div class={`${root} code-action-row`}>
      <CodeBlock code="Fit" language="text" padding="fit" />
      <CodeBlock code="Normal" language="text" />
      <CodeBlock code="Custom" language="text" padding="custom" style={{ padding: '1em 2em' }} />
    </div>
    <Heading as="h3" size="sm">Shell commands</Heading>
    <CodeBlock code="pnpm add /path/to/iu-0.0.0.tgz" language="shellscript" />
    <Heading as="h3" size="sm">Plain text</Heading>
    <CodeBlock code={'No highlighting required.\n  Indentation stays intact.'} language="text" />
    <Heading as="h2">Usage</Heading>
    <CodeBlock code={`import 'iu/styles.css';

<CodeBlock code={'const answer = 42;'} language="typescript" copyable />
<CodeBlock code={'pnpm install'} language="shellscript" />
<CodeBlock code={'Plain text'} language="text" theme="dark" />`} />
    <Heading as="h2">Props</Heading>
    <dl class="specs">
      <div><dt>code</dt><dd>Required source string. Rendered as text, including HTML and JSX.</dd></div>
      <div><dt>copyable</dt><dd>Show a copy button inside the block. It copies the original text, including indentation and line breaks.</dd></div>
      <div><dt>language</dt><dd>tsx (default), javascript, typescript, json, css, html, shellscript, or text</dd></div>
      <div><dt>padding</dt><dd>normal (default), fit for compact spacing, or custom for your own padding and minimum height. Fit has a 1.5em minimum height; normal has a 2.5em minimum height.</dd></div>
      <div><dt>theme</dt><dd>auto (default) follows the inherited color scheme, including iu roots with data-theme. Use light or dark for an explicit appearance.</dd></div>
    </dl>
    <Heading as="h2">Accessibility and behavior</Heading>
    <Paragraph>Uses native pre and code elements. The block is focusable so keyboard users can scroll long lines. Set aria-label to describe the snippet, or tabindex to customize keyboard focus. Native pre attributes, events, ref, class, and style are forwarded. Source code stays left to right inside RTL layouts.</Paragraph>
  </section>;
}
