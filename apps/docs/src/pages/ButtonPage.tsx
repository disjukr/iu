import { createSignal } from 'solid-js';
import { Button, colors, root, glass } from 'iu';

export function ButtonPage() {
  const [count, setCount] = createSignal(0);
  const [dark, setDark] = createSignal(false);
  const [saved, setSaved] = createSignal(false);
  return <section id="button">
          <p class="eyebrow">COMPONENTS</p>
          <h1>Button</h1>
          <p>Trigger an action with a native button. Choose a variant to express its importance.</p>
          <h2>Examples</h2>
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
              <Button size="fit">Fit</Button>
              <Button>Normal</Button>
              <Button size="custom" style={{ padding: '1em 2em' }}>Custom size</Button>
            </div>
            <div class="demo-actions">
              <Button aria-pressed={dark() ? 'true' : 'false'} onClick={() => setDark(value => !value)}>Dark theme {dark() ? 'on' : 'off'}</Button>
            </div>
          </div>
          <h3>Inline buttons in flowing text</h3>
          <p>Use <code>size="fit"</code> to place actions inside a paragraph. The buttons follow the text baseline and keep the surrounding line spacing as the paragraph wraps.</p>
          <div class={`${root} ${glass} demo`} data-theme={dark() ? 'dark' : 'light'}>
            <p class="inline-button-paragraph">
              When you need to step away from a document, choose{' '}
              <Button size="fit" variant="primary" onClick={() => setSaved(value => !value)}>{saved() ? 'Draft saved' : 'Save draft'}</Button>
              {' '}to keep your progress. These actions sit alongside the words in the paragraph, even as the text continues onto several lines. You can{' '}
              <Button size="fit" onClick={() => setSaved(false)}>Edit again</Button>
              {' '}to make a few more changes, or choose{' '}
              <Button size="fit" variant="ghost" onClick={() => setSaved(true)}>Continue later</Button>
              {' '}and return when you are ready. As the screen gets narrower, the words and buttons wrap together while the spacing between lines stays consistent.
            </p>
          </div>
          <pre><code>{`<p>
  Keep your work with{' '}
  <Button size="fit" onClick={save}>Save draft</Button>
  {' '}and continue reading the rest of the paragraph.
</p>`}</code></pre>
          <h2>Usage</h2>
          <pre><code>{`import { Button, colors } from 'iu';

<Button variant="primary" onClick={save}>Save</Button>
<Button size="fit">Cancel</Button>
<Button variant="danger" disabled>Delete</Button>
<Button color={colors.violet[6]}>Custom color</Button>`}</code></pre>
          <h2>Props</h2>
          <dl class="specs">
            <div><dt>variant</dt><dd>primary, secondary (default), ghost, warning, danger</dd></div>
            <div><dt>size</dt><dd>normal (default), fit for inline text, or custom for your own padding and height</dd></div>
            <div><dt>color</dt><dd>Any CSS color to customize the variant’s tint</dd></div>
          </dl>
          <h2>Accessibility and behavior</h2>
          <p>Native attributes, events, ref, class, and style are forwarded. The default type is <code>button</code>; use <code>type="submit"</code> for forms. Tab moves focus; Enter and Space activate the button. Disabled buttons skip keyboard focus.</p>
        </section>;
}
