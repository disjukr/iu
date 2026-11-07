import { createComponent, createSignal } from 'solid-js';
import { hydrate } from '@solidjs/web';
import { Button, root } from 'iu';
import 'iu/styles.css';

document.getElementById('app')!.className = root;
hydrate(() => {
  const [count, setCount] = createSignal(0);
  return createComponent(Button, {
    id: 'hydrated', variant: 'primary', color: '#7048e8',
    get children() { return `Hydrate ${count()}`; },
    onClick: () => setCount(value => value + 1),
  });
}, document.getElementById('app')!);
document.documentElement.dataset.hydrated = 'true';
