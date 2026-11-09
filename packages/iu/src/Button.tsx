import { omit } from 'solid-js';
import type { JSX } from '@solidjs/web';
import * as styles from './button.css.js';

type ButtonStyleProps = {
  class?: JSX.ClassValue;
  color?: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'warning' | 'danger';
  padding?: 'fit' | 'normal' | 'custom';
};

export type NativeButtonProps = ButtonStyleProps &
  Omit<JSX.IntrinsicElements['button'], keyof ButtonStyleProps | 'href'> & { href?: never };

export type ButtonLinkProps = ButtonStyleProps &
  Omit<JSX.IntrinsicElements['a'], keyof ButtonStyleProps | 'href' | 'disabled'> & {
    href: string;
    disabled?: never;
  };

export type ButtonProps = NativeButtonProps | ButtonLinkProps;

const tintProperty = styles.tint.slice(4, -1);

function buttonStyle(color: ButtonProps['color'], style: ButtonProps['style']) {
  if (!color) return style;
  if (typeof style === 'string') return `${style};${tintProperty}:${color}`;
  return { ...(typeof style === 'object' ? style : {}), [tintProperty]: color };
}

const styleKeys = ['class', 'variant', 'padding', 'color', 'style'] as const;

type ButtonComponent = {
  (props: ButtonLinkProps): JSX.Element;
  (props: NativeButtonProps): JSX.Element;
};

export const Button: ButtonComponent = (props: ButtonProps) => {
  const presentation = {
    get style() { return buttonStyle(props.color, props.style); },
    get class() {
      const variant = props.variant ?? 'secondary';
      const custom = variant === 'ghost' ? styles.customGhost
        : variant === 'secondary' ? styles.customSecondary : styles.customFilled;
      return [styles.button, styles.variants[variant], props.color && custom,
        styles.paddings[props.padding ?? 'normal'], props.class];
    },
  };
  return <>{typeof props.href === 'string'
    ? <a {...omit(props, ...styleKeys, 'disabled')} {...presentation} />
    : <button {...omit(props, ...styleKeys, 'href', 'type')} type={props.type ?? 'button'} {...presentation} />
  }</>;
};
