import { createSignal } from 'solid-js';
import { CopyButton, Button, root } from 'iu';

export function CopyButtonExamples() {
  const [text, setText] = createSignal('First\nvalue');
  const [result, setResult] = createSignal('');
  const [key, setKey] = createSignal('');
  const [calls, setCalls] = createSignal(0);
  const [error, setError] = createSignal('');
  const [mounted, setMounted] = createSignal(true);
  return <div class={root} id="copy-examples">
    {mounted() && <CopyButton id="copy-button" text={text()} resetAfter={500} aria-describedby="existing-description" onKeyDown={event => setKey(event.key)} color="#7048e8" padding="fit"
      ref={el => { el.dataset.ref = 'ready'; }} style={{ 'padding-left': '19px' }}
      onCopy={value => setResult(value)} onCopyError={() => setError('failed')}>Copy source</CopyButton>}
    <CopyButton id="lazy-copy" text={() => { setCalls(value => value + 1); return Promise.resolve(text()); }} resetAfter={0}>
      {state => state === 'copied' ? 'Source copied' : 'Copy lazy source'}
    </CopyButton>
    <CopyButton id="rejected-source" text={() => Promise.reject(new Error('Source unavailable'))}>Copy source</CopyButton>
    <output id="copy-key">{key()}</output>
    <output id="lazy-copy-calls">{calls()}</output>
    <CopyButton id="icon-copy" text="" aria-label="Copy empty value" resetAfter={0} />
    <CopyButton id="disabled-copy" text={() => { setCalls(value => value + 1); return 'disabled'; }} disabled>Copy</CopyButton>
    <CopyButton id="cancelled-copy" tooltip={false} text={() => { setCalls(value => value + 1); return 'cancelled'; }} onClick={event => event.preventDefault()}>Cancelled</CopyButton>
    <Button id="copy-text" onClick={() => setText('Updated')}>Change source</Button>
    <Button id="remove-copy" onClick={() => setMounted(false)}>Remove copy button</Button>
    <output id="copy-result">{result()}</output><output id="copy-error">{error()}</output>
  </div>;
}
