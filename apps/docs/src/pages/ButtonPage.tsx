import { Button, Code, CodeBlock, Heading, Paragraph, Text, colors, glass, root } from 'iu';
import { createSignal } from 'solid-js';

export function ButtonPage() {
  const [count, setCount] = createSignal(0);
  const [dark, setDark] = createSignal(false);
  const [saved, setSaved] = createSignal(false);
  return <section id="button">
          <Text as="p" class="eyebrow">COMPONENTS</Text>
          <Heading as="h1" size="xl">Button</Heading>
          <Paragraph>Trigger an action with a native button. Choose a variant to express its importance.</Paragraph>
          <Heading as="h2">Examples</Heading>
          <div class={`${root} ${glass} demo`} data-theme={dark() ? 'dark' : 'light'}>
            <div class="demo-actions">
              <Button variant="primary" onClick={() => setCount(value => value + 1)}>Clicks <output aria-live="polite">{count()}</output></Button>
              <Button>Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="warning">Warning</Button>
              <Button variant="danger">Danger</Button>
              <Button disabled>Disabled</Button>
              <Button variant="primary" color={colors.violet[6]}>Custom color</Button>
            </div>
            <div class="demo-actions">
              <Button padding="fit">Fit</Button>
              <Button>Normal</Button>
              <Button padding="custom" style={{ padding: '1em 2em' }}>Custom padding</Button>
            </div>
            <div class="demo-actions">
              <Button aria-pressed={dark() ? 'true' : 'false'} onClick={() => setDark(value => !value)}>Dark theme {dark() ? 'on' : 'off'}</Button>
            </div>
          </div>
          <Heading as="h3" size="sm">Inline buttons in flowing text</Heading>
          <Paragraph>Use <Code>padding="fit"</Code> to place actions inside a paragraph. The buttons follow the text baseline and keep the surrounding line spacing as the paragraph wraps.</Paragraph>
          <div class={`${root} ${glass} demo`} data-theme={dark() ? 'dark' : 'light'}>
            <Paragraph class="inline-button-paragraph">
              When you need to step away from a document, choose{' '}
              <Button padding="fit" variant="primary" onClick={() => setSaved(value => !value)}>{saved() ? 'Draft saved' : 'Save draft'}</Button>
              {' '}to keep your progress. These actions sit alongside the words in the paragraph, even as the text continues onto several lines. You can{' '}
              <Button padding="fit" onClick={() => setSaved(false)}>Edit again</Button>
              {' '}to make a few more changes, or choose{' '}
              <Button padding="fit" variant="ghost" onClick={() => setSaved(true)}>Continue later</Button>
              {' '}and return when you are ready. As the screen gets narrower, the words and buttons wrap together while the spacing between lines stays consistent.
            </Paragraph>
          </div>
          <CodeBlock code={`<p>
  Keep your work with{' '}
  <Button padding="fit" onClick={save}>Save draft</Button>
  {' '}and continue reading the rest of the paragraph.
</p>`} />
          <Heading as="h2">Usage</Heading>
          <CodeBlock code={`import { Button, colors } from 'iu';

<Button variant="primary" onClick={save}>Save</Button>
<Button padding="fit">Cancel</Button>
<Button variant="danger" disabled>Delete</Button>
<Button color={colors.violet[6]}>Custom color</Button>`} />
          <Heading as="h2">Props</Heading>
          <dl class="specs">
            <div><dt>variant</dt><dd>primary, secondary (default), ghost, warning, danger</dd></div>
            <div><dt>padding</dt><dd>normal (default), fit for inline text, or custom for your own padding and height</dd></div>
            <div><dt>color</dt><dd>Any CSS color to customize the variant’s tint</dd></div>
          </dl>
          <Heading as="h2">Accessibility and behavior</Heading>
          <Paragraph>Native attributes, events, ref, class, and style are forwarded. The default type is <Code>button</Code>; use <Code>type="submit"</Code> for forms. Tab moves focus; Enter and Space activate the button. Disabled buttons skip keyboard focus.</Paragraph>
        </section>;
}
