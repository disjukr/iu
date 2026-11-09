import { omit, Show } from 'solid-js';
import type { JSX } from '@solidjs/web';
import { focusRing } from './root.css.js';
import { selectionLabel } from './selection.css.js';
import { paddings, switchInput } from './switch.css.js';

export type SwitchProps = Omit<JSX.IntrinsicElements['input'], 'class' | 'type' | 'role' | 'aria-checked' | 'prop:indeterminate'> & {
  class?: JSX.ClassValue;
  label?: JSX.Element;
  padding?: keyof typeof paddings;
};

export function Switch(props: SwitchProps) {
  const input = <input
    {...omit(props, 'class', 'label', 'padding')}
    type="checkbox"
    role="switch"
    class={[switchInput, paddings[props.padding ?? 'normal'], focusRing, props.class]}
  />;

  return <Show when={props.label != null} fallback={input}>
    <label class={selectionLabel}>{input}<span>{props.label}</span></label>
  </Show>;
}
