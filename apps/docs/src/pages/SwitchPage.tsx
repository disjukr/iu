import { createSignal } from 'solid-js';
import { Button, Code, CodeBlock, Heading, Paragraph, Switch, Text, glass, root } from 'iu';

export function SwitchPage() {
  const [updates, setUpdates] = createSignal(false);
  const [previews, setPreviews] = createSignal(false);
  const [dark, setDark] = createSignal(false);

  return <section id="switch">
    <Text as="p" class="eyebrow">INPUTS</Text>
    <Heading as="h1" size="xl">Switch</Heading>
    <Paragraph>Use a switch for a setting that takes effect as soon as it changes.</Paragraph>

    <Heading as="h2">Examples</Heading>
    <div class={`${root} ${glass} demo`} data-theme={dark() ? 'dark' : 'light'}>
      <Button aria-pressed={dark() ? 'true' : 'false'} onClick={() => setDark(value => !value)}>Dark theme</Button>
      <div class="demo-actions">
        <Switch label="Live updates" checked={updates()} onChange={event => setUpdates(event.currentTarget.checked)} />
        <Switch aria-label="Sound effects" checked />
        <Switch label="Background sync" disabled />
      </div>
      <output>{updates() ? 'Live updates are on.' : 'Live updates are off.'}</output>
    </div>

    <Heading as="h2">Padding</Heading>
    <Paragraph>Use <Code>fit</Code> for a compact track, <Code>normal</Code> for the default, or <Code>custom</Code> to set padding yourself.</Paragraph>
    <div class="component-grid">
      <Switch padding="fit" label="Fit" checked />
      <Switch padding="normal" label="Normal" checked />
      <Switch padding="custom" style={{ padding: '0.25em 0.375em' }} label="Custom" checked />
    </div>

    <Heading as="h2">In a paragraph</Heading>
    <Paragraph class="inline-button-paragraph">
      While you review a long document, turn <Switch padding="fit" label="Live previews" /> on to see changes as they happen.
      If you want to read through the draft without interruptions, turn previews off and come back to them when you are ready to edit.
    </Paragraph>

    <Heading as="h2">Alongside a button</Heading>
    <div class="code-action-row">
      <Switch padding="normal" label="Show preview" checked={previews()} onChange={event => setPreviews(event.currentTarget.checked)} />
      <Button onClick={() => setPreviews(false)}>Reset preview</Button>
    </div>

    <Heading as="h2">Usage</Heading>
    <CodeBlock code={`import { Switch } from 'iu';

<Switch label="Live updates" checked={updates()} onChange={event => {
  setUpdates(event.currentTarget.checked);
}} />
<Switch aria-label="Sound effects" />`} />
    <Paragraph>Set <Code>label</Code> to display text beside the switch. To render only the control, provide an accessible name with <Code>aria-label</Code> or an associated label. Press Space to toggle a focused switch.</Paragraph>
  </section>;
}
