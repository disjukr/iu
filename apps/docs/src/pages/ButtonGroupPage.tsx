import { CodeBlock } from 'iu';
import { Button, ButtonGroup, root, glass } from 'iu';

export function ButtonGroupPage() {
  return <section id="button-group">
          <p class="eyebrow">COMPONENTS</p>
          <h1>ButtonGroup</h1>
          <p>Join related actions into a shared visual boundary, horizontally or vertically.</p>
          <h2>Examples</h2>
          <div class={`${root} ${glass} demo demo-actions`}>
            <ButtonGroup aria-label="History"><Button>Undo</Button><Button>Redo</Button><Button disabled>Restore</Button></ButtonGroup>
            <ButtonGroup orientation="vertical" aria-label="File actions"><Button>Save</Button><Button>Save as</Button></ButtonGroup>
          </div>
          <h2>Usage</h2>
          <CodeBlock code={`import { Button, ButtonGroup } from 'iu';

<ButtonGroup aria-label="History">
  <Button>Undo</Button>
  <Button>Redo</Button>
</ButtonGroup>

<ButtonGroup orientation="vertical" aria-label="File actions">
  <Button>Save</Button>
  <Button>Save as</Button>
</ButtonGroup>`} />
          <h2>Props</h2>
          <p><code>orientation</code> is <code>horizontal</code> by default. Horizontal groups follow <code>dir</code> for RTL layouts. Place Buttons directly inside the group and set variant, padding, color, and disabled on each button.</p>
          <h2>Accessibility and behavior</h2>
          <p>Give the group an accessible name with <code>aria-label</code> or <code>aria-labelledby</code>. Buttons keep their native Tab, Enter, and Space behavior; the group has no selection state or arrow-key navigation.</p>
        </section>;
}
