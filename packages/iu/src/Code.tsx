import { omit } from 'solid-js';
import type { JSX } from '@solidjs/web';
import { code } from './inlineCode.css.js';

export type CodeProps = Omit<JSX.IntrinsicElements['code'], 'class'> & {
  class?: JSX.ClassValue;
};

export function Code(props: CodeProps) {
  return <code {...omit(props, 'class')} class={[code, props.class]} />;
}
