import { omit, Show, useContext } from 'solid-js';
import type { JSX } from '@solidjs/web';
import { focusRing } from './root.css.js';
import { RadioGroupName } from './RadioGroup.js';
import { paddings, radio } from './radio.css.js';
import { selectionLabel } from './selection.css.js';

export type RadioProps = Omit<JSX.IntrinsicElements['input'], 'class' | 'type'> & {
  class?: JSX.ClassValue;
  label?: JSX.Element;
  padding?: keyof typeof paddings;
};

export function Radio(props: RadioProps) {
  const groupName = useContext(RadioGroupName);
  const input = <input
    {...omit(props, 'class', 'label', 'name', 'padding')}
    type="radio"
    name={groupName ? groupName() : props.name}
    class={[radio, paddings[props.padding ?? 'normal'], focusRing, props.class]}
  />;

  return <Show when={props.label != null} fallback={input}>
    <label class={selectionLabel}>{input}<span>{props.label}</span></label>
  </Show>;
}
