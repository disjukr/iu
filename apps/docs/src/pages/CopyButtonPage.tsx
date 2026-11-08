import { createSignal } from 'solid-js';
import { CodeBlock, CopyButton, colors, root, glass } from 'iu';

export function CopyButtonPage() {
  const [text, setText] = createSignal('pnpm install');
  return <section id="copy-button">
    <p class="eyebrow">ACTIONS</p>
    <h1>CopyButton</h1>
    <p>Copy text to the clipboard with a button. Material Symbols icons and a live status announcement provide feedback for success, progress, and failure.</p>
    <h2>Examples</h2>
    <div class={`${root} ${glass} demo`}>
      <label class="search-label" for="copy-source">Text to copy</label>
      <input id="copy-source" class="search" value={text()} onInput={event => setText(event.currentTarget.value)} />
      <div class="demo-actions">
        <CopyButton text={text} variant="primary">Copy</CopyButton>
        <CopyButton text={text} color={colors.violet[6]}>Copy text</CopyButton>
        <CopyButton text={text} aria-label="Copy current text" tooltip="Copy the current text" />
        <CopyButton text={text} disabled>Copy</CopyButton>
      </div>
    </div>
    <h3>Alongside source code</h3>
    <div class={`${root} code-action-row`}>
      <CodeBlock code={text()} language="shellscript" />
      <CopyButton text={text} padding="normal">{state => state === 'copied' ? 'Copied' : 'Copy'}</CopyButton>
    </div>
    <h2>Usage</h2>
    <CodeBlock code={`import { CopyButton } from 'iu';

<CopyButton text="pnpm install">Copy</CopyButton>
<CopyButton text={() => source()} padding="fit">Copy source</CopyButton>
<CopyButton text={() => source()} aria-label="Copy source" />
<CopyButton text={async () => await loadSource()}>
  {state => state === 'copied' ? 'Copied' : 'Copy'}
</CopyButton>`} />
    <h2>Props</h2>
    <dl class="specs">
      <div><dt>text</dt><dd>A string or a function returning a string or Promise of a string. Functions run only on activation, never during rendering or hydration. Empty strings are supported. Resolver errors use the same failure feedback as clipboard errors.</dd></div>
      <div><dt>tooltip / tooltipPlacement</dt><dd>Built-in Tooltip shows the action and current feedback. Customize the idle text, or use false to disable it. Placement defaults to top.</dd></div>
      <div><dt>resetAfter</dt><dd>Feedback duration in milliseconds, 2000 by default. Zero keeps feedback until the next copy or a change to the text prop or resolver identity.</dd></div>
      <div><dt>messages</dt><dd>Override the copying, copied, and error live announcements. These do not change the visible label.</dd></div>
      <div><dt>children</dt><dd>The visible label in every state. Optionally use a render function receiving idle, copying, copied, or error. Omit children for an icon-only button and provide aria-label.</dd></div>
      <div><dt>onCopy / onCopyError</dt><dd>Called after a successful write with the copied string, or after a failed write with the error. onCopy is a success callback rather than the native copy event.</dd></div>
      <div><dt>Button props</dt><dd>variant, color, padding, disabled, native attributes, events, class, style, and ref work like Button. onClick runs before copying and can cancel it with preventDefault().</dd></div>
    </dl>
    <h2>Accessibility and behavior</h2>
    <p>Tab focuses the button; Enter and Space copy the text. The default type is button. Progress uses aria-busy and aria-disabled to prevent duplicate writes while retaining focus. Feedback is announced through a visually hidden status region; decorative icons are hidden from assistive technology.</p>
    <p>Clipboard writing requires a secure context such as HTTPS or localhost and browser permission. The component writes only after activation, does not read the clipboard, and reports resolver errors and unavailable or rejected writes through error feedback and onCopyError. Async resolution stays pending until the source is ready; it may be subject to the browser’s clipboard permission rules. Activate it again to retry.</p>
  </section>;
}
