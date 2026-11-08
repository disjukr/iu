import { createSignal } from 'solid-js';
import { Button, ButtonGroup, root } from 'iu';

export function ButtonExamples() {
  const [vertical, setVertical] = createSignal(false);
  const [active, setActive] = createSignal(false);
  const [disabled, setDisabled] = createSignal(true);
  const [submits, setSubmits] = createSignal(0);
  const [customColor, setCustomColor] = createSignal<string | undefined>();
  return <div class={root}>
    <Button id="reactive-button" variant={active() ? 'primary' : 'ghost'} size={active() ? 'normal' : 'fit'}
      class={{ custom: active() }} style={{ 'padding-left': '23px' }}
      ref={el => { el.dataset.ref = 'ready'; }} onClick={() => setActive(value => !value)}>
      {active() ? 'Active' : 'Inactive'}
    </Button>
    <Button id="disabled-button" disabled={disabled()} onClick={() => setActive(true)}>Disabled action</Button>
    <Button id="toggle-disabled" onClick={() => setDisabled(value => !value)}>Toggle disabled</Button>
    <div id="button-sizing">
      <Button size="fit">Fit</Button><Button size="normal">Normal</Button><Button size="custom" class="custom-size">Custom</Button>
    </div>
    <div id="inline-buttons">
      <p id="inline-reference">Text before a button after.</p>
      <p class="inline-sample">Text before <Button size="fit" variant="primary">a button</Button> after.</p>
      <p class="inline-sample">Text before <Button size="fit">a button</Button> after.</p>
      <p class="inline-sample">Text before <Button size="fit" variant="ghost">a button</Button> after.</p>
      <p class="inline-sample">Text before <Button size="fit" variant="warning">a button</Button> after.</p>
      <p class="inline-sample">Text before <Button size="fit" variant="danger">a button</Button> after.</p>
    </div>
    <div id="custom-buttons" style={{ '--brand': '#00ff00' }}>
      <Button id="custom-color" variant="primary" color={customColor()} style="padding-left:19px">Custom color</Button>
      <Button id="custom-object" color={customColor()} style={{ 'padding-right': '21px' }}>Custom object style</Button>
      <Button id="custom-variable" variant="primary" color="var(--brand)">CSS variable color</Button>
      <Button id="set-color" onClick={() => setCustomColor('#ff00ff')}>Set color</Button>
      <Button id="clear-color" onClick={() => setCustomColor(undefined)}>Clear color</Button>
    </div>
    <ButtonGroup id="button-group" aria-label="Grouped actions" orientation={vertical() ? 'vertical' : 'horizontal'}>
      <Button onClick={() => setVertical(value => !value)}>First</Button>
      <Button disabled>Unavailable</Button>
      <Button>Last</Button>
    </ButtonGroup>
    <ButtonGroup id="rtl-group" dir="rtl" aria-label="RTL actions"><Button>First</Button><Button>Last</Button></ButtonGroup>
    <ButtonGroup id="single-group" aria-label="Single action"><Button>Only</Button></ButtonGroup>
    <form onSubmit={event => { event.preventDefault(); setSubmits(value => value + 1); }}>
      <Button id="default-action">Default action</Button>
      <Button id="submit-action" type="submit" name="action" value="save">Submit action</Button>
      <output id="submits">{submits()}</output>
    </form>
  </div>;
}
