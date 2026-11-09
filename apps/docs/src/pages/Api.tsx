import { Code, Heading, Paragraph, Text } from 'iu';

export function Api() {
  return <section id="api">
          <Text as="p" class="eyebrow">FOUNDATIONS</Text>
          <Heading as="h1" size="xl">API reference</Heading>
          <div class="table-scroll"><table><thead><tr><th>Export</th><th>Purpose</th></tr></thead><tbody>{[
            ['root / unroot', 'Start or stop the scoped reset and inherited defaults'],
            ['Button', 'Native button with variant and padding options'],
            ['CopyButton', 'Copy text with accessible feedback'],
            ['Tooltip', 'Supplementary descriptions on hover and focus'],
            ['Heading', 'Headings with semantic levels and independent size presets'],
            ['Paragraph / Text', 'Body text with shared size presets and optional paragraph spacing'],
            ['Code', 'Inline source code'],
            ['Prose', 'Scoped styles for native HTML content'],
            ['Checkbox', 'Native checkbox with an optional label and mixed state'],
            ['Radio', 'Native radio input with fit, normal, and custom padding'],
            ['RadioGroup', 'Fieldset with a shared name for native single-choice selection'],
            ['Card', 'Grouped content surfaces with native action and selection semantics'],
            ['CodeBlock', 'Source code with Shiki syntax highlighting'],
            ['ButtonGroup', 'Joined related actions in horizontal or vertical layout'],
            ['glass', 'Translucent surface with blur, border, and shadow'],
            ['colors', 'The original Open Color palette'], ['typography', 'Font stack, size, weight, and line height'],
            ['vars', 'Typed CSS variables for theme overrides'], ['focusRing', ':focus-visible styles for keyboard focus'],
            ['JSX', 'Type re-export from @solidjs/web'],
          ].map(([name, description]) => <tr><td><Code>{name}</Code></td><td>{description}</td></tr>)}</tbody></table></div>
          <Paragraph>Portals outside the root need their own <Code>root</Code> class. <Code>unroot</Code> does not disable explicit component classes or application styles.</Paragraph>
        </section>;
}
