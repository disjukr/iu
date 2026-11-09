import { omit } from 'solid-js';
import type { JSX } from '@solidjs/web';
import { paragraphSpacing, textSizes, typographyElement } from './typography.css.js';

export type ParagraphProps = Omit<JSX.IntrinsicElements['p'], 'class'> & {
  size?: keyof typeof textSizes;
  class?: JSX.ClassValue;
};

export function Paragraph(props: ParagraphProps) {
  return <p {...omit(props, 'size', 'class')}
    class={[typographyElement, paragraphSpacing, textSizes[props.size ?? 'md'], props.class]} />;
}
