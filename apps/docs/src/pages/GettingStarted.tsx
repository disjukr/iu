import { Button, Code, CodeBlock, Heading, Paragraph, Text, root, unroot } from 'iu';
const setup = `import 'iu/styles.css';

<section class={root}>
  <p>Hello, iu.</p>
  <Button variant="primary">Continue</Button>
  <div class={unroot}>
    <p>Browser defaults.</p>
    <div class={root}>iu styles resume here.</div>
  </div>
</section>`;

export function GettingStarted() {
  return <section id="getting-started">
          <Text as="p" class="eyebrow">FOUNDATIONS</Text>
          <Heading as="h1" size="xl">Getting started</Heading>
          <Paragraph>Install the iu package archive supplied with your release in your application:</Paragraph>
          <CodeBlock language="shellscript" code="pnpm add /path/to/iu-0.0.0.tgz" />
          <Paragraph>The current component implementation requires <Code>solid-js</Code> and <Code>@solidjs/web</Code> 2.x. Install compatible peer dependencies and set TypeScript’s <Code>jsxImportSource</Code> to <Code>@solidjs/web</Code>.</Paragraph>
          <Paragraph>Import <Code>iu/styles.css</Code> once in your application entry point, then apply <Code>root</Code> to the area that uses iu.</Paragraph>
          <CodeBlock code={setup} />
          <Paragraph><Code>root</Code> sets tokens, typography, and a subtree reset. <Code>unroot</Code> clears those defaults; a nested <Code>root</Code> resumes them. Requires CSS <Code>@scope</Code> support.</Paragraph>
        </section>;
}
