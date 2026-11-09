import { omit } from 'solid-js';
import { dynamic } from '@solidjs/web';
import type { JSX } from '@solidjs/web';
import { focusRing, glass } from './root.css.js';
import { card, interactive, paper } from './card.css.js';

type CardTag = 'div' | 'article' | 'section' | 'a' | 'button' | 'label';

type CardElementProps = {
  [Tag in CardTag]: Omit<JSX.IntrinsicElements[Tag], 'class'> &
    (Tag extends 'div' ? { as?: Tag } : { as: Tag }) &
    (Tag extends 'a' | 'button' ? unknown : { type?: never });
}[CardTag];

export type CardProps = CardElementProps & {
  class?: JSX.ClassValue;
  variant?: 'paper' | 'glass';
};

export function Card(props: CardProps) {
  const Tag = dynamic((): string => props.as ?? 'div');
  const rest = omit(props, 'as', 'class', 'variant', 'type');
  return <Tag
    {...rest}
    type={props.as === 'button' ? props.type ?? 'button' : props.as === 'a' ? props.type : undefined}
    class={[
      card,
      props.variant === 'glass' ? glass : paper,
      (props.as === 'button' || props.as === 'a' || props.as === 'label') && [interactive, focusRing],
      props.class,
    ]}
  />;
}
