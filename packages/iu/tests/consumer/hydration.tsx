import { createComponent, createSignal } from 'solid-js';
import { hydrate } from '@solidjs/web';
import { Button, CodeBlock, Tooltip, CopyButton, root } from 'iu';
import 'iu/styles.css';

document.getElementById('app')!.className = root;
hydrate(() => {
  const [count, setCount] = createSignal(0);
  return [createComponent(Button, {
    id: 'hydrated', variant: 'primary', color: '#7048e8',
    get children() { return `Hydrate ${count()}`; },
    onClick: () => setCount(value => value + 1),
  }), createComponent(CodeBlock, {
    id: 'hydrated-code', language: 'typescript', get code() { return `const count = ${count()};`; },
  }), createComponent(Tooltip, {
    content: 'Hydrated tooltip', children: trigger => createComponent(Button, { ...trigger, id: 'hydrated-tooltip-trigger', children: 'Help' }),
  }), createComponent(CopyButton, { id: 'hydrated-copy', text: () => 'Hydrated copy', children: 'Copy hydrated source' })];
}, document.getElementById('app')!);
document.documentElement.dataset.hydrated = 'true';
