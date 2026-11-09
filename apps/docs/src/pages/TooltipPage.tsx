import { createSignal } from 'solid-js';
import { Button, CodeBlock, Heading, Paragraph, Text, Tooltip, colors, glass, root } from 'iu';

export function TooltipPage() {
  const [dark, setDark] = createSignal(false);
  const [open, setOpen] = createSignal(false);
  return <section id="tooltip">
    <Text as="p" class="eyebrow">OVERLAYS</Text>
    <Heading as="h1" size="xl">Tooltip</Heading>
    <Paragraph>Add a short, non-interactive description to a control. Hover over a trigger or focus it with Tab. Press Escape to dismiss the description without moving focus.</Paragraph>
    <Heading as="h2">Examples</Heading>
    <div class={`${root} ${glass} demo demo-actions`} data-theme={dark() ? 'dark' : 'light'}>
      <Tooltip content="Save your changes">
        {trigger => <Button {...trigger}>Save</Button>}
      </Tooltip>
      <Tooltip content="This action is not available" disabled>
        {trigger => <Button {...trigger}>Tooltip disabled</Button>}
      </Tooltip>
      <Tooltip content="Aligned with the start of the trigger" placement="bottom-start">
        {trigger => <Button {...trigger}>Bottom start</Button>}
      </Tooltip>
    </div>
    <Heading as="h3" size="sm">Color and theme</Heading>
    <div class={`${root} ${glass} demo demo-actions`} data-theme={dark() ? 'dark' : 'light'}>
      <Tooltip content="A custom violet tint" color={colors.violet[6]}>
        {trigger => <Button {...trigger} color={colors.violet[6]}>Custom color</Button>}
      </Tooltip>
      <Button aria-pressed={dark() ? 'true' : 'false'} onClick={() => setDark(value => !value)}>Dark theme {dark() ? 'on' : 'off'}</Button>
    </div>
    <Heading as="h3" size="sm">Controlled visibility</Heading>
    <div class={`${root} ${glass} demo demo-actions`}>
      <Tooltip content="Visibility managed by your application" open={open()} onOpenChange={setOpen}>
        {trigger => <Button {...trigger}>Controlled tooltip</Button>}
      </Tooltip>
      <Button aria-pressed={open() ? 'true' : 'false'} onClick={() => setOpen(value => !value)}>Toggle tooltip</Button>
    </div>
    <Heading as="h2">Usage</Heading>
    <CodeBlock code={`import { Button, Tooltip } from 'iu';

<Tooltip content="Save your changes" placement="top">
  {trigger => <Button {...trigger} onClick={save}>Save</Button>}
</Tooltip>`} />
    <Heading as="h2">Props</Heading>
    <dl class="specs">
      <div><dt>content</dt><dd>Required plain text description. An empty string suppresses the tooltip.</dd></div>
      <div><dt>children</dt><dd>Render function receiving trigger props. Spread them onto one focusable native element or a component that forwards native events and ref.</dd></div>
      <div><dt>color</dt><dd>Any CSS color, including Open Color values and CSS variables. Uses the same contrasting neutral tint approach as Button; the arrow inherits the surface colors.</dd></div>
      <div><dt>placement</dt><dd>top (default), bottom, left, right, optionally followed by -start or -end. Start/end follow the text direction. The position flips and shifts to fit the viewport; the arrow follows the trigger.</dd></div>
      <div><dt>delay / closeDelay</dt><dd>Hover opening delay (500ms) and closing delay (100ms). Keyboard focus opens immediately.</dd></div>
      <div><dt>disabled</dt><dd>Suppresses the tooltip and removes its description reference. This does not disable the trigger.</dd></div>
      <div><dt>open / defaultOpen</dt><dd>Controlled visibility or initial uncontrolled visibility. Both default to closed. Use onOpenChange with open.</dd></div>
      <div><dt>onOpenChange</dt><dd>Receives requested visibility changes from hover, focus, and Escape.</dd></div>
      <div><dt>describedBy</dt><dd>Existing description IDs to preserve alongside the tooltip.</dd></div>
      <div><dt>id / class / style</dt><dd>Customize the tooltip surface. Its generated ID is stable across server rendering and hydration.</dd></div>
    </dl>
    <Heading as="h2">Accessibility and behavior</Heading>
    <Paragraph>The trigger uses aria-describedby and the surface uses role="tooltip". Focus stays on the trigger. The tooltip stays visible while the pointer is over the trigger or description, and Escape cancels pending display or dismisses an open tooltip.</Paragraph>
    <Paragraph>Keep the trigger’s accessible name independent of the tooltip. Tooltip text is supplementary; essential instructions should remain visible. Use a focusable trigger and avoid native disabled buttons, which cannot receive keyboard focus.</Paragraph>
    <Paragraph>Spread the trigger props without replacing their ref, description, or event handlers. Use describedBy to retain existing descriptions. Content is plain text; links, buttons, and other interactive content belong in a popover or dialog.</Paragraph>
    <Paragraph>The native Popover API places the description above clipping and stacking containers while preserving inherited fonts, direction, and theme. Positioning updates on scroll and resize. A browser supporting the Popover API is required. Touch hover does not open the tooltip.</Paragraph>
  </section>;
}
