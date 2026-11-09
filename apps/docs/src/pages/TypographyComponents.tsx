import { For } from 'solid-js';
import { Card, Code, CodeBlock, Heading, Paragraph, Prose, Text } from 'iu';

const typographySizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

const examples = {
  Heading: {
    description: 'Give a section a semantic heading. Set the heading level with as and the visual size with size.',
    preview: () => <>
      <Paragraph>The blue area shows the heading’s line box. The orange bands show the margins between siblings: <Code>1em</Code> above and <Code>0.5em</Code> below, measured relative to each heading’s font size.</Paragraph>
      <div class="type-specimens">
        <For each={typographySizes}>{size => <div>
          <Code>{size}</Code>
          <div class="type-margin-preview">
            <span hidden />
            <Heading as="h3" size={size}>Project settings</Heading>
            <span hidden />
          </div>
        </div>}</For>
      </div>
    </>,
    source: typographySizes.map(size => `<Heading as="h3" size="${size}">Project settings</Heading>`).join('\n'),
  },
  Paragraph: {
    description: 'Display a paragraph with document spacing and a shared body text size.',
    preview: () => <>
      <Paragraph>The blue area shows the paragraph’s text box. The orange band shows its <Code>0.5em</Code> bottom margin when another element follows.</Paragraph>
      <div class="type-specimens">
        <For each={typographySizes}>{size => <div>
          <Code>{size}</Code>
          <div class="type-margin-preview">
            <Paragraph size={size}>Changes to your profile appear on your public page.</Paragraph>
            <span hidden />
          </div>
        </div>}</For>
      </div>
    </>,
    source: typographySizes.map(size => `<Paragraph size="${size}">Changes to your profile appear on your public page.</Paragraph>`).join('\n'),
  },
  Text: {
    description: 'Style inline text with the shared body sizes. Text renders a span by default.',
    preview: () => <div class="type-specimens">
      <For each={typographySizes}>{size => <div>
        <Code>{size}</Code>{' '}
        <Text size={size}>Changes saved</Text>
      </div>}</For>
    </div>,
    source: typographySizes.map(size => `<Text size="${size}">Changes saved</Text>`).join('\n'),
  },
  Code: {
    description: 'Mark up a command or identifier within a line of text.',
    preview: () => <Paragraph>Start the server with <Code>pnpm dev</Code>.</Paragraph>,
    source: '<Paragraph>Start the server with <Code>pnpm dev</Code>.</Paragraph>',
  },
  Prose: {
    description: 'Apply scoped typography and control styles to native HTML. Use unroot to end the scope for a subtree.',
    preview: () => <Prose as="article"><h2>Project settings</h2><p>Choose how your project appears to collaborators.</p></Prose>,
    source: '<Prose as="article">\n  <h2>Project settings</h2>\n  <p>Choose how your project appears to collaborators.</p>\n</Prose>',
  },
};

export function TypographyComponentPage(props: { name: keyof typeof examples }) {
  const example = () => examples[props.name];
  return <section>
    <Text as="p" class="eyebrow">TYPOGRAPHY</Text>
    <Heading as="h1" size="xl">{props.name}</Heading>
    <Paragraph>{example().description}</Paragraph>
    <Heading as="h2">Example</Heading>
    <Card variant="glass" class="demo">{example().preview()}</Card>
    <CodeBlock code={`import { ${props.name === 'Code' ? 'Code, Paragraph' : props.name} } from 'iu';\n\n${example().source}`} />
    <Paragraph><a href="#/typography">See the typography guide for shared styles and more examples.</a></Paragraph>
  </section>;
}
