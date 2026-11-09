import { omit } from 'solid-js';
import { dynamic } from '@solidjs/web';
import type { JSX } from '@solidjs/web';
import { textSizes, typographyElement } from './typography.css.js';

export type TextProps = Omit<JSX.IntrinsicElements['p'], 'class'> & {
  as?: 'p' | 'span' | 'div';
  size?: keyof typeof textSizes;
  class?: JSX.ClassValue;
};

export function Text(props: TextProps) {
  const Tag = dynamic(() => props.as ?? 'span');
  const rest = omit(props, 'as', 'size', 'class');
  return <Tag {...rest} class={[typographyElement, textSizes[props.size ?? 'md'], props.class]} />;
}
