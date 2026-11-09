import { Button, Code, CodeBlock, Heading, Paragraph, Prose, Text, root, typography, unroot } from 'iu';

export function Typography() {
  return <section id="typography">
          <Text as="p" class="eyebrow">FOUNDATIONS</Text>
          <Heading as="h1" size="xl">Typography</Heading>
          <div class="type-specimen"><Text as="p" size="sm">Aa</Text><Text>The quick brown fox jumps over the lazy dog.</Text></div>
          <dl class="specs"><div><dt>Font family</dt><dd>{typography.fontFamily}</dd></div><div><dt>Size / Line height</dt><dd>{typography.fontSize} / {typography.lineHeight}</dd></div><div><dt>Weight</dt><dd>{typography.fontWeight}</dd></div></dl>
          <Paragraph>Load fonts in your app. This site uses system fonts.</Paragraph>
          <Heading as="h2">Heading, Paragraph, and Text</Heading>
          <Paragraph>Use Heading and Paragraph for document spacing. Text renders a span by default and applies the same body sizes without adding margins.</Paragraph>
          <div class={`${root} demo`}>
            <Heading as="h2" size="md">Section heading</Heading>
            <Heading as="h3" size="md">Subsection heading</Heading>
            <Paragraph>This paragraph uses the default body size.</Paragraph>
            <Text size="sm">This inline note uses the small text size.</Text>
          </div>
          <CodeBlock code={`import { Heading, Paragraph, Text } from 'iu';

<Heading as="h1" size="xl">Settings</Heading>
<Heading as="h2" size="md">Appearance</Heading>
<Paragraph>Choose how the app looks.</Paragraph>
<Text size="sm">Optional</Text>`} />
          <Heading as="h2">Compact actions and code</Heading>
          <div class={`${root} demo`}>
            <Heading as="h3">Project settings <Button padding="fit">Edit</Button></Heading>
            <Paragraph>If your current settings are getting in the way, select <Button padding="fit">Reset</Button> to restore the defaults. You can then review each option and make the changes you want before starting a new project.</Paragraph>
            <Heading as="h3" size="sm">Install <Code>iu</Code></Heading>
            <Paragraph>Start the development server with <Code>pnpm dev</Code>.</Paragraph>
          </div>
          <CodeBlock code={`<Heading as="h3">
  Project settings <Button padding="fit">Edit</Button>
</Heading>
<Paragraph>
  If your current settings are getting in the way, select <Button padding="fit">Reset</Button> to restore the defaults. You can then review each option and make the changes you want before starting a new project.
</Paragraph>
<Heading as="h3" size="sm">Install <Code>iu</Code></Heading>
<Paragraph>Start the development server with <Code>pnpm dev</Code>.</Paragraph>`} />
          <Heading as="h2">Prose</Heading>
          <Paragraph>Wrap HTML content in Prose to apply typography, link, and button styles. Prose renders a <Code>div</Code> by default and accepts <Code>as="article"</Code> or <Code>as="section"</Code>. The <Code>unroot</Code> class ends the styling scope.</Paragraph>
          <div class={root}>
            <Prose as="article" aria-labelledby="profile-heading">
              <h3 id="profile-heading">Profile settings</h3>
              <Heading as="h3" size="sm">Compact heading</Heading>
              <Paragraph size="sm">Compact paragraph</Paragraph>
              <p>Update your profile or read the <a href="#/getting-started">setup guide</a>.</p>
              <div class="demo-actions">
                <button type="button">Native button</button>
                <Button>iu Button</Button>
              </div>
              <div class={unroot}>
                <h3>Outside the Prose scope</h3>
                <button type="button">Unstyled button</button>
              </div>
            </Prose>
          </div>
          <CodeBlock code={`import { Prose, root, unroot } from 'iu';

<div class={root}>
  <Prose as="article" aria-labelledby="profile-heading">
    <h2 id="profile-heading">Profile settings</h2>
    <p>Read the <a href="/guide">setup guide</a>.</p>
    <button type="button">Save</button>
    <div class={unroot}>
      <p>This content is outside the Prose styling scope.</p>
    </div>
  </Prose>
</div>`} />
        </section>;
}
