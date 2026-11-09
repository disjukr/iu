import { omit, Show } from 'solid-js';
import type { JSX } from '@solidjs/web';
import { checkbox, paddings } from './checkbox.css.js';
import { focusRing } from './root.css.js';
import { selectionLabel } from './selection.css.js';

export type CheckboxProps = Omit<JSX.IntrinsicElements['input'], 'class' | 'type' | 'prop:indeterminate'> & {
  class?: JSX.ClassValue;
  label?: JSX.Element;
  indeterminate?: boolean;
  padding?: keyof typeof paddings;
};

export function Checkbox(props: CheckboxProps) {
  const input = <input
    {...omit(props, 'class', 'label', 'indeterminate', 'padding')}
    type="checkbox"
    prop:indeterminate={props.indeterminate ?? false}
    class={[checkbox, paddings[props.padding ?? 'normal'], focusRing, props.class]}
  />;

  return <Show when={props.label != null} fallback={input}>
    <label class={selectionLabel}>{input}<span>{props.label}</span></label>
  </Show>;
}
