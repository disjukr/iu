import { omit } from 'solid-js';
import { dynamic } from '@solidjs/web';
import type { JSX } from '@solidjs/web';
import { headingSizes, headingSpacing, typographyElement } from './typography.css.js';

export type HeadingProps = Omit<JSX.IntrinsicElements['h2'], 'class'> & {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size?: keyof typeof headingSizes;
  class?: JSX.ClassValue;
};

export function Heading(props: HeadingProps) {
  const Tag = dynamic(() => props.as ?? 'h2');
  const rest = omit(props, 'as', 'size', 'class');
  return <Tag {...rest} class={[typographyElement, headingSpacing, headingSizes[props.size ?? 'md'], props.class]} />;
}
