import { createSignal } from 'solid-js';
import { Card, Code, CodeBlock, Heading, Paragraph, Radio, RadioGroup, Text } from 'iu';

export function CardPage() {
  const [archived, setArchived] = createSignal(0);

  return <section id="card">
    <Text as="p" class="eyebrow">CONTENT</Text>
    <Heading as="h1" size="xl">Card</Heading>
    <Paragraph>Group related content on a surface. Choose a semantic container, a link, a button, or a label for a native selection control.</Paragraph>

    <Heading as="h2">Surfaces</Heading>
    <div class="component-grid">
      <Card as="article" aria-labelledby="paper-title">
        <Heading as="h3" size="sm" id="paper-title">Project overview</Heading>
        <Paragraph>Paper is the default surface for grouped content.</Paragraph>
      </Card>
      <Card as="article" variant="glass" aria-labelledby="glass-title">
        <Heading as="h3" size="sm" id="glass-title">Recent activity</Heading>
        <Paragraph>Glass adds blur and a shadow behind the surface.</Paragraph>
      </Card>
    </div>

    <Heading as="h2">Actions</Heading>
    <div class="component-grid">
      <Card as="a" href="#/typography">Read the typography guide</Card>
      <Card as="button" onClick={() => setArchived(count => count + 1)}>Archive an item</Card>
    </div>
    <Text as="p" role="status">{archived()} archived</Text>

    <Heading as="h2">Selection</Heading>
    <Paragraph>Click the card or focus its radio button to select a delivery option. Use checkboxes for independent choices.</Paragraph>
    <RadioGroup legend="Delivery options" name="delivery">
      <div class="component-grid">
        <Card as="label"><Radio padding="fit" value="standard" checked /> Standard delivery</Card>
        <Card as="label"><Radio padding="fit" value="express" /> Express delivery</Card>
      </div>
    </RadioGroup>

    <Heading as="h2">Usage</Heading>
    <CodeBlock code={`import { Card, Radio, RadioGroup } from 'iu';

<Card as="article">Project overview</Card>
<Card as="a" href="/projects">View projects</Card>
<Card as="button" onClick={archive}>Archive</Card>
<RadioGroup legend="Delivery options" name="delivery">
  <Card as="label">
    <Radio padding="fit" value="express" /> Express delivery
  </Card>
</RadioGroup>`} />
    <Paragraph><Code>as</Code> defaults to <Code>div</Code> and also supports <Code>article</Code>, <Code>section</Code>, <Code>a</Code>, <Code>button</Code>, and <Code>label</Code>. Native attributes are forwarded to the rendered element. Button cards default to <Code>type="button"</Code>.</Paragraph>
    <Paragraph>Use the card itself for a single action. When a card contains several controls, use a container card and place the controls inside it.</Paragraph>
  </section>;
}
