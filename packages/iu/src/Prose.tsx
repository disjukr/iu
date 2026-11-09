import { omit } from 'solid-js';
import { dynamic } from '@solidjs/web';
import type { JSX } from '@solidjs/web';
import { prose } from './prose.css.js';

export type ProseProps = Omit<JSX.IntrinsicElements['div'], 'class'> & {
  as?: 'div' | 'article' | 'section';
  class?: JSX.ClassValue;
};

export function Prose(props: ProseProps) {
  const Tag = dynamic(() => props.as ?? 'div');
  return <Tag {...omit(props, 'as', 'class')} class={[prose, props.class]} />;
}
