import { omit, Show } from 'solid-js';
import type { JSX } from '@solidjs/web';
import { input, inputLabel, paddings } from './input.css.js';
import { focusRing } from './root.css.js';

export type InputProps = Omit<JSX.IntrinsicElements['input'], 'class' | 'type'> & {
  class?: JSX.ClassValue;
  label?: JSX.Element;
  type?: 'text' | 'search' | 'email' | 'password' | 'tel' | 'url' | 'number';
  padding?: keyof typeof paddings;
};

export function Input(props: InputProps) {
  const field = <input
    {...omit(props, 'class', 'label', 'padding', 'type')}
    type={props.type ?? 'text'}
    class={[input, paddings[props.padding ?? 'normal'], focusRing, props.class]}
  />;

  return <Show when={props.label != null} fallback={field}>
    <label class={inputLabel}><span>{props.label}</span>{field}</label>
  </Show>;
}
