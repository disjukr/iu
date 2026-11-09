import { createSignal } from 'solid-js';
import { Button, Checkbox, Code, CodeBlock, Heading, Paragraph, Text, glass, root } from 'iu';

export function CheckboxPage() {
  const [dark, setDark] = createSignal(false);
  const [saved, setSaved] = createSignal('');
  const [email, setEmail] = createSignal(true);
  const [sms, setSms] = createSignal(false);

  return <section id="checkbox">
    <Text as="p" class="eyebrow">INPUTS</Text>
    <Heading as="h1" size="xl">Checkbox</Heading>
    <Paragraph>Use a checkbox for an independent on or off choice. Set <Code>label</Code> to display text beside the control.</Paragraph>

    <Heading as="h2">Grouped choices</Heading>
    <Paragraph>Use a fieldset and legend to name related checkboxes. The parent checkbox shows a mixed state while only some options are selected.</Paragraph>
    <fieldset>
      <legend>Notification channels</legend>
      <div class="demo-actions">
        <Checkbox label="All channels" checked={email() && sms()} indeterminate={email() !== sms()} onChange={event => {
          setEmail(event.currentTarget.checked);
          setSms(event.currentTarget.checked);
        }} />
        <Checkbox label="Email" checked={email()} onChange={event => setEmail(event.currentTarget.checked)} />
        <Checkbox label="SMS" checked={sms()} onChange={event => setSms(event.currentTarget.checked)} />
        <Checkbox label="Push notifications" disabled />
      </div>
    </fieldset>

    <Heading as="h2">Padding</Heading>
    <Paragraph>Use <Code>fit</Code> for compact layouts, <Code>normal</Code> for the default, or <Code>custom</Code> to set your own padding.</Paragraph>
    <div class="component-grid">
      <Checkbox padding="fit" label="Fit" checked />
      <Checkbox padding="normal" label="Normal" checked />
      <Checkbox padding="custom" style={{ padding: '0.375em' }} label="Custom" checked />
    </div>

    <Heading as="h2">Alongside a button</Heading>
    <div class={`${root} ${glass} demo`} data-theme={dark() ? 'dark' : 'light'}>
      <Button aria-pressed={dark() ? 'true' : 'false'} onClick={() => setDark(value => !value)}>Dark theme</Button>
      <form onSubmit={event => {
        event.preventDefault();
        const updates = new FormData(event.currentTarget).has('updates');
        setSaved(updates ? 'Email updates enabled.' : 'Email updates disabled.');
      }}>
        <div class="code-action-row">
          <Checkbox name="updates" label="Email updates" />
          <Button type="submit">Save preferences</Button>
        </div>
        <output>{saved()}</output>
      </form>
    </div>

    <Heading as="h2">Usage</Heading>
    <CodeBlock code={`import { Checkbox } from 'iu';

<Checkbox name="updates" label="Email updates" />
<Checkbox name="selection" aria-label="Select row" />`} />
    <Paragraph>Omit <Code>label</Code> to render just the input. Associate an external label or provide <Code>aria-label</Code> to name it. <Code>indeterminate</Code> controls the mixed state, and <Code>checked</Code> determines whether the value is included in form submission.</Paragraph>
  </section>;
}
