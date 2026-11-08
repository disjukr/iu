import { createSignal } from 'solid-js';
import { Button, CodeBlock, root } from 'iu';

export function CodeBlockExamples() {
  const [changed, setChanged] = createSignal(false);
  const [dark, setDark] = createSignal(false);
  return <div id="code-block-examples" class={root} data-theme={dark() ? 'dark' : 'light'} dir="rtl">
    <CodeBlock id="reactive-code" code={changed() ? 'printf "updated"\n' : 'const element = <script>alert("<&")</script>;\n\n  // next line\n'}
      language={changed() ? 'shellscript' : 'tsx'} class={{ custom: changed() }} style={{ 'max-width': '240px' }}
      aria-label="Example source" ref={el => { el.dataset.ref = 'ready'; }} />
    <CodeBlock id="plain-code" code={'<img src=x onerror=alert(1)>\n  second\n'} language="text" theme="dark" tabindex={-1} />
    <div id="code-button-row" style={{ display: 'flex', 'align-items': 'center', gap: '12px' }}>
      <CodeBlock code="pnpm install" language="shellscript" />
      <Button>Continue</Button>
    </div>
    <div id="fit-code-button-row" style={{ display: 'flex', 'align-items': 'center', gap: '12px' }}>
      <CodeBlock code="pnpm install" language="shellscript" padding="fit" />
      <Button padding="fit">Continue</Button>
    </div>
    <CodeBlock id="custom-code" code="custom" padding="custom" style={{ padding: '3px 5px' }} />
    <CodeBlock id="empty-code" code="" />
    <CodeBlock id="long-code" language="text" code={'long '.repeat(200)} style={{ width: '200px' }} />
    <Button id="change-code" onClick={() => setChanged(value => !value)}>Change code</Button>
    <Button id="code-theme" onClick={() => setDark(value => !value)}>Change code theme</Button>
  </div>;
}
