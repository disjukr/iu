import { createSignal } from 'solid-js';
import { Button, colors, root, unroot, glass } from 'iu';

export function Experiment() {
  const [count, setCount] = createSignal(0);
  const [dark, setDark] = createSignal(false);
  const [buttonColor, setButtonColor] = createSignal<string | undefined>(colors.violet[6]);

  return <section class={`${root} ${glass} experiment`} data-theme={dark() ? 'dark' : 'light'}>
    <h2 class="experiment-title">Experiment</h2>
    <p>A space to try iu styles and components.</p>
    <div class="experiment-actions">
      <Button variant="primary" onClick={() => setCount(value => value + 1)}>
        Count <output aria-live="polite">{count()}</output>
      </Button>
      <Button onClick={() => setCount(0)}>Reset</Button>
      <Button variant="ghost" aria-pressed={dark() ? 'true' : 'false'} onClick={() => setDark(value => !value)}>
        Dark theme {dark() ? 'on' : 'off'}
      </Button>
    </div>
    <div class="button-samples">
      <h3>Buttons</h3>
      <div class="experiment-actions"><Button variant="primary">Primary</Button><Button>Secondary</Button><Button variant="ghost">Ghost</Button><Button variant="warning">Warning</Button><Button variant="danger">Danger</Button><Button disabled>Disabled</Button></div>
      <div class="experiment-actions"><Button size="fit">Fit</Button><Button>Normal</Button><Button size="custom" style={{ 'min-height': '4em', padding: '1.25em 2em' }}>Custom</Button></div>
      <p class="inline-experiment">An inline <Button size="fit">fit button</Button> fits the surrounding text.</p>
      <div class="experiment-actions">
        <label class="color-control">Button color <input type="color" aria-label="Button color" value={buttonColor() ?? colors.violet[6]} onInput={event => setButtonColor(event.currentTarget.value)} /></label>
        <Button variant="primary" color={buttonColor()}>Custom primary</Button>
        <Button color={buttonColor()}>Custom secondary</Button>
        <Button variant="ghost" color={buttonColor()}>Custom ghost</Button>
        <Button variant="ghost" onClick={() => setButtonColor(undefined)}>Clear color</Button>
      </div>
    </div>
    <div class="scope-samples">
      <div class="scope-card"><h3>Inside root</h3><p>iu typography and reset.</p></div>
      <div class={`${unroot} scope-card native-sample`}>
        <h3>Inside unroot</h3><p>Browser defaults.</p>
        <div class={`${root} ${glass} nested-surface`}><h3>Inside a nested root</h3><p>iu defaults resume here.</p></div>
      </div>
    </div>
  </section>;
}
