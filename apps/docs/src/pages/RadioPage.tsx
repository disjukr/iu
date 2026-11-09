import { createSignal } from 'solid-js';
import { Button, Code, CodeBlock, Heading, Paragraph, Radio, RadioGroup, Text, glass, root } from 'iu';

export function RadioPage() {
  const [dark, setDark] = createSignal(false);
  const [applied, setApplied] = createSignal('');
  return <section id="radio">
    <Text as="p" class="eyebrow">INPUTS</Text>
    <Heading as="h1" size="xl">Radio</Heading>
    <Paragraph>Choose one option in a RadioGroup. Set the label prop to give each radio an accessible name and align its text with the control.</Paragraph>

    <Heading as="h2">Padding</Heading>
    <Paragraph>Padding changes the space inside the outer circle around the selection dot. Use <Code>fit</Code> for compact radios, <Code>normal</Code> for the default spacing, or <Code>custom</Code> to set padding yourself.</Paragraph>
    <RadioGroup legend="Compare radio padding">
      <div class="component-grid">
        <Radio padding="fit" value="fit" checked label="Fit" />
        <Radio padding="normal" value="normal" label="Normal" />
        <Radio padding="custom" value="custom" style={{ padding: '0.375em' }} label="Custom" />
      </div>
    </RadioGroup>

    <Heading as="h2">Alongside a button</Heading>
    <div class={`${root} ${glass} demo`} data-theme={dark() ? 'dark' : 'light'}>
      <Button aria-pressed={dark() ? 'true' : 'false'} onClick={() => setDark(value => !value)}>Dark theme</Button>
      <form onSubmit={event => {
        event.preventDefault();
        setApplied(String(new FormData(event.currentTarget).get('layout')));
      }}>
        <RadioGroup legend="Layout" name="layout">
          <div class="code-action-row">
            <Radio value="Compact" checked label="Compact" />
            <Radio value="Comfortable" label="Comfortable" />
            <Button type="submit">Apply layout</Button>
          </div>
        </RadioGroup>
        <output>{applied() && `Applied layout: ${applied()}`}</output>
      </form>
    </div>

    <Heading as="h2">Usage</Heading>
    <CodeBlock code={`import { Radio, RadioGroup } from 'iu';

<RadioGroup legend="Delivery options" name="delivery">
  <Radio value="standard" checked label="Standard" />
  <Radio value="express" label="Express" />
</RadioGroup>`} />
    <Paragraph>RadioGroup supplies a shared name to its radios. Set <Code>name</Code> to choose the key used in form submission. Use the arrow keys to move between options.</Paragraph>
  </section>;
}
