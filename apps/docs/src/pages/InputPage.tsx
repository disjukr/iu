import { createSignal } from 'solid-js';
import { Button, Code, CodeBlock, Heading, Input, Paragraph, Text, glass, root } from 'iu';

export function InputPage() {
  const [dark, setDark] = createSignal(false);
  const [submitted, setSubmitted] = createSignal('');

  return <section id="input">
    <Text as="p" class="eyebrow">INPUTS</Text>
    <Heading as="h1" size="xl">Input</Heading>
    <Paragraph>Enter text in a native form field. Use <Code>label</Code> to give the field a visible name.</Paragraph>

    <Heading as="h2">Examples</Heading>
    <div class={[root, glass, 'demo']} data-theme={dark() ? 'dark' : 'light'}>
      <Button onClick={() => setDark(value => !value)} aria-pressed={dark() ? 'true' : 'false'}>Dark theme</Button>
      <form onSubmit={event => {
        event.preventDefault();
        setSubmitted(String(new FormData(event.currentTarget).get('email')));
      }}>
        <div class="demo-actions" style={{ 'align-items': 'end' }}>
          <Input label="Email" type="email" name="email" placeholder="name@example.com" autocomplete="email" required />
          <Button type="submit" variant="primary">Continue</Button>
        </div>
        <output>{submitted() && `Submitted: ${submitted()}`}</output>
      </form>
      <div class="demo-actions">
        <Input label="Read only" value="Read only value" readonly />
        <Input label="Disabled" value="Disabled value" disabled />
        <Input label="Invalid email" type="email" value="example" aria-invalid="true" aria-describedby="input-error" />
      </div>
      <Paragraph id="input-error">Enter an email address with an @ sign.</Paragraph>
    </div>

    <Heading as="h2">Padding</Heading>
    <div class="component-grid" style={{ 'align-items': 'start' }}>
      <Input label="Fit" padding="fit" />
      <Input label="Normal" />
      <Input label="Custom" padding="custom" style={{ padding: '0.75em' }} />
    </div>
    <Paragraph>
      Send the update to <Input aria-label="Recipient" padding="fit" placeholder="Name" size={8} /> when it is ready.
    </Paragraph>

    <Heading as="h2">Usage</Heading>
    <CodeBlock code={`import { Input } from 'iu';

<Input label="Email" type="email" name="email" required />
<Input aria-label="Search" type="search" padding="fit" />`} />
    <Paragraph>Input forwards native attributes, events, and refs. Set <Code>aria-invalid</Code> and <Code>aria-describedby</Code> to associate a validation message.</Paragraph>
  </section>;
}
