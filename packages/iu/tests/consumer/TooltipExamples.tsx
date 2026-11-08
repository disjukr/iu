import { createSignal } from 'solid-js';
import { Button, Tooltip, root } from 'iu';

export function TooltipExamples() {
  const [disabled, setDisabled] = createSignal(false);
  const [tint, setTint] = createSignal<string | undefined>('#7048e8');
  const [open, setOpen] = createSignal(false);
  const [mounted, setMounted] = createSignal(true);
  return <div class={root} id="tooltip-examples" data-theme="dark" dir="rtl">
    <p id="existing-description">Existing description</p>
    {mounted() && <Tooltip content="Save your changes" describedBy="existing-description" delay={80} disabled={disabled()} color={tint()} style="letter-spacing:0px">
      {trigger => <Button {...trigger} id="tooltip-trigger">Save</Button>}
    </Tooltip>}
    <Tooltip content="Controlled description" open={open()} onOpenChange={setOpen}>
      {trigger => <Button {...trigger} id="controlled-tooltip-trigger">Controlled</Button>}
    </Tooltip>
    <Button id="tooltip-color" onClick={() => setTint(value => value ? undefined : '#7048e8')}>Toggle tooltip color</Button>
    <Button id="disable-tooltip" onClick={() => setDisabled(value => !value)}>Toggle tooltip disabled</Button>
    <Button id="unmount-tooltip" onClick={() => setMounted(false)}>Remove tooltip</Button>
    <div style={{ position: 'fixed', top: '2px', left: '8px', width: '100px', height: '30px', overflow: 'hidden' }}>
      <Tooltip content="This tooltip escapes a clipping container and flips away from the top edge" placement="top-start" delay={0}>
        {trigger => <Button {...trigger} id="edge-tooltip-trigger" padding="fit">Edge</Button>}
      </Tooltip>
    </div>
  </div>;
}
