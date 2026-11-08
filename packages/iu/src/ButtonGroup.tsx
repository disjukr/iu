import { omit } from 'solid-js';
import type { JSX } from '@solidjs/web';
import * as styles from './buttonGroup.css.js';

export type ButtonGroupProps = Omit<JSX.IntrinsicElements['div'], 'class'> & {
  class?: JSX.ClassValue;
  orientation?: 'horizontal' | 'vertical';
};

/** Related actions with joined edges and native button keyboard behavior. */
export function ButtonGroup(props: ButtonGroupProps) {
  const rest = omit(props, 'class', 'orientation', 'role');
  return <div
    {...rest}
    role={props.role ?? 'group'}
    class={[styles.group, styles.orientations[props.orientation ?? 'horizontal'], props.class]}
  />;
}
