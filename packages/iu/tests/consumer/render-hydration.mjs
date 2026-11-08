import { writeFileSync } from 'node:fs';
import { createComponent } from 'solid-js';
import { generateHydrationScript, renderToString } from '@solidjs/web';
import { Button, CodeBlock } from 'iu';

const html = renderToString(() => [createComponent(Button, {
  id: 'hydrated', variant: 'primary', color: '#7048e8', children: 'Hydrate 0',
}), createComponent(CodeBlock, { id: 'hydrated-code', code: 'const count = 0;', language: 'typescript' })]);
writeFileSync('hydration.html', `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Button hydration</title>${generateHydrationScript()}</head><body><div id="app">${html}</div><script>window.serverButton=document.getElementById('hydrated');window.serverCode=document.getElementById('hydrated-code')</script><script type="module" src="/hydration.tsx"></script></body></html>`);
