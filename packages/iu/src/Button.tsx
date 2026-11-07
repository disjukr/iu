import { omit } from 'solid-js';
import type { JSX } from '@solidjs/web';
import * as styles from './button.css.js';

export type ButtonProps = Omit<JSX.IntrinsicElements['button'], 'class' | 'color'> & {
  class?: JSX.ClassValue;
  color?: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'warning' | 'danger';
  size?: 'fit' | 'normal' | 'custom';
};

const tintProperty = styles.tint.slice(4, -1);

function buttonStyle(color: ButtonProps['color'], style: ButtonProps['style']) {
  if (!color) return style;
  if (typeof style === 'string') return `${style};${tintProperty}:${color}`;
  return { ...(typeof style === 'object' ? style : {}), [tintProperty]: color };
}

export function Button(props: ButtonProps) {
  const rest = omit(props, 'class', 'type', 'variant', 'size', 'color', 'style');
  return <button
    {...rest}
    type={props.type ?? 'button'}
    style={buttonStyle(props.color, props.style)}
    class={[
      styles.button,
      styles.variants[props.variant ?? 'secondary'],
      props.color && (props.variant === 'ghost' ? styles.customGhost : (props.variant ?? 'secondary') === 'secondary' ? styles.customSecondary : styles.customFilled),
      styles.sizes[props.size ?? 'normal'],
      props.class,
    ]}
  />;
}
