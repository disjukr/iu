import { createContext, createUniqueId, omit } from 'solid-js';
import type { JSX } from '@solidjs/web';

export const RadioGroupName = createContext<() => string>();

export type RadioGroupProps = JSX.IntrinsicElements['fieldset'] & {
  legend?: JSX.Element;
  name?: string;
};

export function RadioGroup(props: RadioGroupProps) {
  const id = `iu-radio-${createUniqueId()}`;
  const name = () => props.name ?? id;
  return <RadioGroupName value={name}>
    <fieldset {...omit(props, 'children', 'legend', 'name')}>
      {props.legend != null && <legend>{props.legend}</legend>}
      {props.children}
    </fieldset>
  </RadioGroupName>;
}
