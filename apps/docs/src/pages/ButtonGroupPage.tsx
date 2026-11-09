import { Button, ButtonGroup, Code, CodeBlock, Heading, Paragraph, Text, glass, root } from 'iu';

export function ButtonGroupPage() {
  return <section id="button-group">
          <Text as="p" class="eyebrow">COMPONENTS</Text>
          <Heading as="h1" size="xl">ButtonGroup</Heading>
          <Paragraph>Join related actions into a shared visual boundary, horizontally or vertically.</Paragraph>
          <Heading as="h2">Examples</Heading>
          <div class={`${root} ${glass} demo demo-actions`}>
            <ButtonGroup aria-label="History"><Button>Undo</Button><Button>Redo</Button><Button disabled>Restore</Button></ButtonGroup>
            <ButtonGroup orientation="vertical" aria-label="File actions"><Button>Save</Button><Button>Save as</Button></ButtonGroup>
          </div>
          <Heading as="h2">Usage</Heading>
          <CodeBlock code={`import { Button, ButtonGroup } from 'iu';

<ButtonGroup aria-label="History">
  <Button>Undo</Button>
  <Button>Redo</Button>
</ButtonGroup>

<ButtonGroup orientation="vertical" aria-label="File actions">
  <Button>Save</Button>
  <Button>Save as</Button>
</ButtonGroup>`} />
          <Heading as="h2">Props</Heading>
          <Paragraph><Code>orientation</Code> is <Code>horizontal</Code> by default. Horizontal groups follow <Code>dir</Code> for RTL layouts. Place Buttons directly inside the group and set variant, padding, color, and disabled on each button.</Paragraph>
          <Heading as="h2">Accessibility and behavior</Heading>
          <Paragraph>Give the group an accessible name with <Code>aria-label</Code> or <Code>aria-labelledby</Code>. Buttons keep their native Tab, Enter, and Space behavior; the group has no selection state or arrow-key navigation.</Paragraph>
        </section>;
}
